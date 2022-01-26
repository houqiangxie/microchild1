"use strict";

function _toConsumableArray(t) {
	if (Array.isArray(t)) {
		for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
		return r
	}
	return Array.from(t)
}
var Tile4326Layer = function() {
	function getTileDomains(t) {
		var e = t.match(domainExpr);
		if (e && e.length > 0 && 3 == e.length) {
			return [parseInt(e[1]), parseInt(e[2])]
		}
		return null
	}

	function clamp(t, e, r) {
		return t < e ? e : t > r ? r : t
	}

	function getFragShader(t) {
		var e = "gl_FragColor = texColor;\n";
		return t && (e =
				"\tfloat invert = 1.0;\n\t// sepia处理\n\tfloat grey =  dot(texColor.rgb, vec3(0.299, 0.587, 0.114));\n\tvec4 sepia = vec4(grey * vec3(1.2, 1.0, 0.8), 1.0);\n\t// 反色处理\n\tgl_FragColor = vec4(1.0 - sepia.rgb * invert, texColor.a);\n"
			),
			"#ifdef GL_ES\n\tprecision mediump float;\n#endif\nvarying vec2 v_UV;\nuniform sampler2D texture;\nvoid main(){\n\tvec4 texColor = texture2D(texture,v_UV);\n" +
			e + "}\n"
	}

	function TileXYZLayerFor4326(t) {
		this._options = Object.assign({
				minzoom: 3,
				maxzoom: 22,
				tileSize: 256
			}, t), this._extent = this._options.extent || [-180, -90, 180, 90], this._map = null, this._transform = null, this._program =
			null, this._gl = null, this._proxyUrl = t.proxyUrl, this._invertColor = t.invertColor, lib = t.mapboxgl;
		var e = this.domains = getTileDomains(t.url);
		e && (this.domain = e[0]), this._tiles = {}, this._caches = {
			data: {},
			get: function(t) {
				return this.data[t]
			},
			put: function(t, e) {
				this.data[t] = e
			},
			clear: function() {
				this.data = {}
			}
		}
	}

	function Tile(t, e, r, i, a, n, o) {
		this._resolution = i, this._layer = a, this._coord = [t, e, r], this._coord1 = [t, n, o], this._gl = a._gl, this.texture =
			null, this.loaded = !1, this.tileSize = a._options.tileSize, this.worldExtent = a._extent, this.extent = [0, 0, 0,
				0
			], this.translate = [0, 0, 0, 0], this._url = a.getUrl(), this._load()
	}
	var domainExpr = /\{([0-9]+)-([0-9]+)\}/,
		lib = null,
		transparentPngUrl =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=",
		transparentImage = function() {
			var t = document.createElement("canvas");
			t.width = 256, t.height = 256;
			var e = t.getContext("2d");
			return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 256, 256), t
		}();
	TileXYZLayerFor4326.prototype = {
		constructor: TileXYZLayerFor4326,
		addTo: function(t, e, r) {
			var i = t.mbxmap,
				a = this;
			this._map = i, this._transform = i.transform, this._layerId = e;
			var n = {
				id: this._layerId,
				type: "custom",
				onAdd: function(t) {
					return function(e, r) {
						return t._onAdd(e, r, this)
					}
				}(this),
				render: function(t) {
					return function(e, r) {
						return t._render(e, r, this)
					}
				}(this)
			};
			r ? i.addLayer(n, r) : i.addLayer(n), i.on("remove", function() {
				a._caches.clear()
			})
		},
		getUrl: function() {
			var t = this._options.url;
			return this.domains && (t = t.replace(domainExpr, this.domain), ++this.domain > this.domains[1] && (this.domain =
				this.domains[0])), this._proxyUrl && (t = this._proxyUrl.replace("{0}", t)), t
		},
		_onAdd: function(t, e) {
			this._gl = e, this.transparentTexture = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.transparentTexture),
				e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE,
					transparentImage), e.bindTexture(e.TEXTURE_2D, null);
			var r = e.createShader(e.VERTEX_SHADER);
			if (e.shaderSource(r,
					"\n\t\tuniform mat4 u_Matrix;\n\t\tuniform vec4 u_Translate;\n\t\tattribute vec3 a_Position;\n\t\tattribute vec2 a_UV;\n\t\tvarying vec2 v_UV;\n\t\tvoid main(){\n\t\t\tv_UV = a_UV;\n\t\t\tgl_Position = u_Matrix * vec4( (a_Position.xy + u_Translate.xy), 0.0 ,1.0 );\n\t\t}\n\t"
				), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) throw "Shader Compile Error: " + e.getShaderInfoLog(
				r);
			var i = e.createShader(e.FRAGMENT_SHADER);
			if (e.shaderSource(i, getFragShader(this._invertColor)), e.compileShader(i), !e.getShaderParameter(i, e.COMPILE_STATUS))
				throw "Shader Compile Error: " + e.getShaderInfoLog(i);
			var a = this._program = e.createProgram();
			e.attachShader(a, r), e.attachShader(a, i), e.linkProgram(a);
			var n = this._attributes = {
				aPosition: {
					name: "a_Position",
					location: e.getAttribLocation(this._program, "a_Position")
				},
				aUV: {
					name: "a_UV",
					location: e.getAttribLocation(this._program, "a_UV")
				}
			};
			this._buffers = {
				aPositionBuffer: {
					buffer: e.createBuffer(),
					size: 3,
					attribute: n.aPosition,
					points: new Float32Array(18),
					update: function(t) {},
					update1: function(t) {
						e.bindBuffer(e.ARRAY_BUFFER, this.buffer);
						var r = t,
							i = r[0],
							a = r[1],
							n = r[2],
							o = r[3],
							s = this.points;
						s[0] = i, s[1] = o, s[2] = 0, s[3] = n, s[4] = o, s[5] = 0, s[6] = i, s[7] = a, s[8] = 0, s[9] = n, s[10] =
							o, s[11] = 0, s[12] = i, s[13] = a, s[14] = 0, s[15] = n, s[16] = a, s[17] = 0, e.bufferData(e.ARRAY_BUFFER,
								s, e.STATIC_DRAW), e.enableVertexAttribArray(this.attribute.location), e.vertexAttribPointer(this.attribute
								.location, this.size, e.FLOAT, !1, 0, 0)
					}
				},
				aUVBuffer: {
					buffer: e.createBuffer(),
					size: 2,
					attribute: n.aUV,
					points: new Float32Array([0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1]),
					hasBufferData: !1,
					update: function() {
						e.bindBuffer(e.ARRAY_BUFFER, this.buffer), this.hasBufferData || (e.bufferData(e.ARRAY_BUFFER, this.points,
							e.STATIC_DRAW), this.hasBufferData = !0), e.enableVertexAttribArray(this.attribute.location), e.vertexAttribPointer(
							this.attribute.location, this.size, e.FLOAT, !1, 0, 0)
					}
				}
			}, this._uniforms = {
				uMatrix: {
					value: null,
					location: e.getUniformLocation(this._program, "u_Matrix"),
					update: function(t) {
						this.value !== t && e.uniformMatrix4fv(this.location, !1, t)
					}
				},
				uTranslate: {
					value: [0, 0],
					location: e.getUniformLocation(this._program, "u_Translate"),
					update: function() {}
				},
				uTexture: {
					value: null,
					location: e.getUniformLocation(this._program, "texture"),
					update: function() {}
				}
			}
		},
		_render: function(t, e) {
			if (this._program) {
				var r = this._transform,
					i = this._options,
					a = i.tileSize || 256,
					n = r.coveringZoomLevel({
						tileSize: a,
						roundZoom: !0
					});
				n = Math.round(this._transform._zoom), this.realz = n, n = n < 5 ? 5 : n, this.z = n, void 0 !== i.minzoom && n <
					i.minzoom && (n = 0), void 0 !== i.maxzoom && n > i.maxzoom && (n = i.maxzoom);
				var o = this.resolution = this.getResolutionFromZ(n),
					s = r.center,
					l = clamp(s.lng + o * a, -180, 180),
					u = clamp(s.lat - o * a, -90, 90),
					c = clamp(s.lng, -180, 180),
					h = clamp(s.lat, -90, 90),
					_ = lib.MercatorCoordinate.fromLngLat([c, u]),
					f = lib.MercatorCoordinate.fromLngLat([l, h]);
				this.centerMecatorExtent = [_.x, _.y, f.x, f.y], t.useProgram(this._program), t.enable(t.BLEND), t.blendFuncSeparate(
					t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA);
				for (var m in this._uniforms) this._uniforms[m].update(e);
				for (var d in this._buffers) this._buffers[d].update();
				this.calcTilesInView(), this.renderTiles()
			}
		},
		renderTiles: function() {
			var t, e = this._gl,
				r = this._tiles;
			for (var i in r) t = r[i], t.calcExtent(), this._buffers.aPositionBuffer.update1(t.extent), e.uniform4fv(this._uniforms
					.uTranslate.location, t.translate), e.activeTexture(e.TEXTURE0), t.texture ? e.bindTexture(e.TEXTURE_2D, t.texture) :
				e.bindTexture(e.TEXTURE_2D, this.transparentTexture), e.uniform1i(this._uniforms.uTexture.location, 0), e.drawArrays(
					e.TRIANGLES, 0, 6)
		},
		calcTilesInView: function() {
			var t = this.z,
				e = this._options,
				r = e.tileSize || 256,
				i = this.resolution,
				a = this._extent,
				n = i * r,
				o = this.getViewExtent(),
				s = [-180, 90],
				l = Math.floor((o[0] - s[0]) / n),
				u = Math.floor((s[1] - o[3]) / n),
				c = Math.ceil((o[2] - s[0]) / n),
				h = Math.ceil((s[1] - o[1]) / n),
				_ = Math.floor((o[0] - a[0]) / n),
				f = Math.floor((a[3] - o[3]) / n),
				m = Math.ceil((a[3] - o[1]) / n);
			u = u < 1 ? 1 : u, this.realz < 5 && (h = h > 10 ? 10 : h), f = f < 1 ? 1 : f, this.realz < 5 && (m = m > 10 ? 10 :
				m);
			var d, g, p, A = _,
				T = f,
				E = this._tiles,
				x = this._caches,
				v = {},
				b = [],
				R = Math.floor(((o[0] + o[2]) / 2 - s[0]) / n),
				U = Math.floor((s[1] - (o[1] + o[3]) / 2) / n);
			for (d = l; d <= c; d++)
				for (A++, g = u; g <= h; g++) T++, p = this._key(t, d, g), E[p] ? (v[p] = E[p], delete E[p]) : (x.get(p), x.get(
					p) ? v[p] = x.get(p) : b.push({
					k: p,
					d: (d - R) * (d - R) + (g - U) * (g - U),
					p: [t, d, g, i, this, A, T]
				}));
			b.sort(function(t, e) {
				return t.d - e.d
			}), b.forEach(function(t) {
				v[t.k] = new(Function.prototype.bind.apply(Tile, [null].concat(_toConsumableArray(t.p))))
			});
			for (var p in E) E[p].request && E[p].request.cancel();
			this._tiles = v
		},
		_key: function(t, e, r) {
			return t + "/" + e + "/" + r
		},
		getResolutionFromZ: function(t) {
			return 1.4062500000000002 / Math.pow(2, t)
		},
		getViewExtent: function() {
			for (var t, e, r, i, a = this._transform, n = [a.pointLocation(new lib.Point(0, 0)), a.pointLocation(new lib.Point(
						a.width, 0)), a.pointLocation(new lib.Point(a.width, a.height)), a.pointLocation(new lib.Point(0, a.height))],
					o = 0, s = null; o < n.length; o++) s = n[o], 0 == o ? (t = s.lng, e = s.lat, r = s.lng, i = s.lat) : (t > s.lng &&
				(t = s.lng), e > s.lat && (e = s.lat), r < s.lng && (r = s.lng), i < s.lat && (i = s.lat));
			var l = [t, e],
				u = [r, i];
			return projzh.datum.gcj02.toWGS84(l, l), projzh.datum.gcj02.toWGS84(u, u), [clamp(l[0], -180, 180), clamp(l[1], -
				90, 90), clamp(u[0], -180, 180), clamp(u[1], -90, 90)]
		},
		repaint: function() {
			this._map.triggerRepaint()
		}
	};
	var getImage = function() {
		function getImage(t, e) {
			if (requestNum > MAX_REQUEST_NUM) {
				var r = {
					url: t,
					callback: e,
					canceled: !1,
					cancel: function() {
						this.canceled = !0
					}
				};
				return requestQuenes.push(r), r
			}
			var i = !1,
				a = function() {
					if (!i)
						for (i = !0, requestNum--; requestQuenes.length && requestNum < MAX_REQUEST_NUM;) {
							var t = requestQuenes.shift(),
								e = t.url,
								r = t.callback,
								a = t.canceled;
							a || (t.cancel = getImage(e, r).cancel)
						}
				};
			requestNum++;
			var n = get(t, function(t, r) {
				if (a(), !t) {
					var i = window.URL || window.webkitURL,
						n = new Blob([r], {
							type: "image/png"
						}),
						o = i.createObjectURL(n),
						s = new Image;
					s.src = o, s.onload = function() {
						e(s), i.revokeObjectURL(s.src)
					}, s.src = r.byteLength ? i.createObjectURL(n) : transparentPngUrl
				}
			});
			return {
				cancel: function() {
					a(), n.abort()
				}
			}
		}

		function get(url, callback, async) {
			var xhr = new XMLHttpRequest;
			return xhr.open("GET", url, !1 !== async), xhr.setRequestHeader("Authorization",
					"Basic NWEwNTBkYmYwOGVhNDdhNTlhYzA4NTY5MmM4MDFiMzk6NDIxZGU1ODU0NGQwNDNhMmJlYjUxZDk3ZDJhY2Q3Njg="), xhr.responseType =
				"arraybuffer", xhr.onabort = function(t) {
					callback(!0, null)
				}, xhr.onload = function(event) {
					if (!xhr.status || xhr.status >= 200 && xhr.status < 300) {
						var source;
						if (source = xhr.response) try {
							source = eval("(" + source + ")")
						} catch (t) {}
						source ? callback(!1, source) : callback(!1, null)
					}
				}, xhr.onerror = function(t) {
					callback(!0, null)
				}, xhr.send(null), xhr
		}
		var MAX_REQUEST_NUM = 16,
			requestNum = 0,
			requestQuenes = [];
		return getImage
	}();
	return Tile.prototype = {
		constructor: Tile,
		calcExtent: function() {
			var t = this.worldExtent;
			t = [-180, -90, 180, 90];
			var e = this.tileSize,
				r = this._resolution,
				i = this._coord,
				a = i[1],
				n = i[2],
				o = Math.ceil((t[3] - t[1]) / r / e),
				s = clamp(a * e * r - t[2], t[0], t[2]),
				l = clamp(s + e * r, t[0], t[2]),
				u = clamp(t[3] - n * e * r, t[1], t[3]),
				c = clamp(u - e * r, t[1], t[3]),
				h = n + 1;
			h = h > o ? o : h;
			var _ = [s, c],
				f = [l, u];
			projzh.datum.gcj02.fromWGS84(_, _), projzh.datum.gcj02.fromWGS84(f, f);
			var m = lib.MercatorCoordinate.fromLngLat(_),
				d = lib.MercatorCoordinate.fromLngLat(f);
			this.extent[0] = m.x, this.extent[1] = m.y, this.extent[2] = d.x, this.extent[3] = d.y
		},
		_load: function() {
			var t = this._gl,
				e = this,
				r = this._coord[0],
				i = this._coord[1],
				a = this._coord[2],
				n = this._url.replace("{x}", i).replace("{y}", a).replace("{z}", r);
			this.request = getImage(n, function(n) {
				if (delete e.request, e._gl) {
					var o = e.texture = t.createTexture();
					t.bindTexture(t.TEXTURE_2D, o), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.pixelStorei(t.UNPACK_ALIGNMENT, 1),
						t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
						t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S,
							t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texImage2D(t.TEXTURE_2D,
							0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, n), t.bindTexture(t.TEXTURE_2D, null), e._layer._caches.put(r + "/" + i +
							"/" + a, e), e.loaded = !0, e._layer.repaint()
				}
			})
		}
	}, TileXYZLayerFor4326
}();
