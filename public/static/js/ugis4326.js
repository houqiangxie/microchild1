import api from '@/api/index'; // 接口地址


// let mathNum =Math.random()*6

// let urlMathPath =  api['mapUrl'+ mathNum];
// console.log('------------------------')
// 	console.log(urlMathPath)
// 	console.log('------------------------')
// let urlMathPath;
if (groupName === 'EGIS影像') {

    // api.mapUrl+Math.floor(Math.random()*7);
    // EGIS影像
    if (egis_tdt_img) {
        mapInst.setLayoutProperty('egis_tdt_img', 'visibility', 'visible');
    } else {
        egis_tdt_img = new Tile4326Layer({
            // url: api.mapUrl+"service/api/egis/base/v1/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
            url: api.mapUrl+"vec_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=4f62e1d82bd46e2ff470b291c2260156",
            // url: urlMathPath+"vec_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=f7ddd36808a691a00b5eb6a8b059379b",


            minzoom: 12.8,
		    maxzoom: 18,
            mapboxgl: mapboxgl,
            invertColor: false
        });
        egis_tdt_img.addTo(map, 'egis_tdt_img', beforeId);
        egisLayers.push('egis_tdt_img');
    }
    
    // EGIS影像标注
    if (egis_tdt_cia) {
        mapInst.setLayoutProperty('egis_tdt_cia', 'visibility', 'visible');
    } else {
        egis_tdt_cia = new Tile4326Layer({
            // url: api.mapUrl+"service/api/egis/base/v1/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
            url: api.mapUrl+"vec_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=4f62e1d82bd46e2ff470b291c2260156",
            // url: urlMathPath+"vec_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=f7ddd36808a691a00b5eb6a8b059379b",


            minzoom: 12.8,
		    maxzoom: 18,
            mapboxgl: mapboxgl,
            invertColor: false
        });
        egis_tdt_cia.addTo(map, 'egis_tdt_cia', beforeId);
        egisLayers.push('egis_tdt_cia');
    }
} else if (groupName === 'EGIS矢量') {
    // api.mapUrl+Math.floor(Math.random()*7);
    // EGIS矢量
    if (egis_tdt_vec) {
        mapInst.setLayoutProperty('egis_tdt_vec', 'visibility', 'visible');
    } else {
        egis_tdt_vec = new Tile4326Layer({
            // url: api.mapUrl+"service/api/egis/base/v1/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
            url: api.mapUrl+"vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=4f62e1d82bd46e2ff470b291c2260156",
            // url: urlMathPath+"vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=f7ddd36808a691a00b5eb6a8b059379b",


            minzoom: 12.8,
		    maxzoom: 18,
            mapboxgl: mapboxgl,
            invertColor: false
        });
        egis_tdt_vec.addTo(map, 'egis_tdt_vec', beforeId);
        // egisLayers.push('egis_tdt_vec');
    }
    // EGIS矢量标注
    if (egis_tdt_cva) {
        mapInst.setLayoutProperty('egis_tdt_cva', 'visibility', 'visible');
    } else {
        egis_tdt_cva = new Tile4326Layer({
            // url: api.mapUrl+"service/api/egis/base/v1/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
            url: api.mapUrl+"vec_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=4f62e1d82bd46e2ff470b291c2260156",
            // url: urlMathPath+"vec_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=4f62e1d82bd46e2ff470b291c2260156",


            minzoom: 12.8,
		    maxzoom: 18,
            mapboxgl: mapboxgl,
            invertColor: false
        });
        egis_tdt_cva.addTo(map, 'egis_tdt_cva', beforeId);
        egisLayers.push('egis_tdt_cva');
    }
}