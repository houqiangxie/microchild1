var ocxKq;
function Load() {
  if (BrowserIsIE()) {
    try {
      ocxKq = document.getElementById("csocx");
      if (ocxKq.object == null) alert("还没有注册控件");
      else alert("已经注册控件");
    } catch (e) {
      alert("e:" + e.description);
    }
  } else {
    console.log(document.cookie);
    initPlugin();
  }
}

/**
 * 与扩展通信
 **/
function createCustomEvent(msg) {
  var evt = document.createEvent("CustomEvent");
  evt.initCustomEvent("excuteActiveX", true, false, msg);
  document.dispatchEvent(evt);
}
/**
 * 判断浏览器类别
 **/
function BrowserIsIE() {
  // var explorer = navigator.userAgent;
  // //console.info("explorer："+explorer);
  // if (explorer.indexOf("Trident") >= 0) {
  //   //console.info("IS IE");
  //   return true;
  // } else {
  //   console.info("IS Not IE");
  //   return false;
  // }
  return false;
}

/**
 * 组装发送命令json
 * @param {方法名称} methodName
 */
function BuildJson(methodName) {
  var paras = "[";
  var length = arguments.length;
  for (var i = 1; i < length; i++) {
    paras += arguments[i];
    if (i < length - 1) paras += ",";
  }
  paras += "]";
  var buildResult =
    '{"MethodName":"' + methodName + '","Parameters":' + paras + "}";
  //alert("BuildJson 结果："+ JSON.stringify(buildResult));
  //alert("BuildJson 结果："+buildResult);
  //return  JSON.stringify(buildResult);
  return buildResult;
}

/**
 * 组装变量
 * @param {变量名称} key
 * @param {变量值} value
 */
function BuildParamJson(key, value) {
  var paraJson =
    '{"ParameterName":"' + key + '","ParameterKey":"' + value + '"}';
  //console.info("paraJson:"+JSON.stringify(paraJson));
  return paraJson;
}
function changeSurfaceModel() {
  try {
    let call_surface = document.getElementById("callSurfaceID").checked;
    let msg_surface = document.getElementById("msgSurfaceID").checked;
    if (BrowserIsIE()) {
      ocxKq.RegistCallBack(window, "callbackInfo", "msg");
      console.log("RegistCallBack finish!");
      var loginRet = parent.ocxKq.SetSurfaceModel(call_surface?1:0, msg_surface?1:0);
      if (!loginRet) alert("Login fail!");
    } else {
      excuteFucOfPlugin("SetSurfaceModel", [call_surface?1:0, msg_surface?1:0]);
    }
  } catch (error) {
    alert("changeSurfaceModel:" + error);
  }
}
//调度操作操作
/**
 * 初始化uct控件
 * 并登录
 */
function AcitvexInit() {
  try {
    var name = document.getElementById("userName").value;
    var pwd = document.getElementById("password").value;
    var ip = document.getElementById("IPAddress").value;
    if (BrowserIsIE()) {
      ocxKq.RegistCallBack(window, "callbackInfo", "msg");
      console.log("RegistCallBack finish!");
      var loginRet = parent.ocxKq.Login(name, pwd, ip);
      if (!loginRet) alert("Login fail!");
    } else {
      // var nameParam = BuildParamJson("name", name);
      // var pwdParam = BuildParamJson("pwd", pwd);
      // var ipParam = BuildParamJson("ip", ip);
      // var jsonParameter = BuildJson("Login", nameParam, pwdParam, ipParam);
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("Login", [name, pwd, ip]);
    }
  } catch (ex) {
    alert("AcitvexInit:" + ex);
  }
}

function InitMQ() {
  try {
    var ip = document.getElementById("txt_MQIP").value;
    var port = document.getElementById("txt_MQPort").value;
    var name = document.getElementById("txt_MQName").value;
    var key = document.getElementById("txt_MQFilterkey").value;
    var value = document.getElementById("txt_MQFilterValue").value;

    if (BrowserIsIE()) {
      var ret = ocxKq.InitMQ(ip, port, name, key, value);
      alert("InitMQ：" + ret);
    } else {
      var ipParam = BuildParamJson("ip", ip);
      var portParam = BuildParamJson("port", port);
      var nameParam = BuildParamJson("name", name);
      var keyParam = BuildParamJson("key", key);
      var valueParam = BuildParamJson("value", value);

      var jsonParameter = BuildJson(
        "InitMQ",
        ipParam,
        portParam,
        nameParam,
        keyParam,
        valueParam
      );
      createCustomEvent(jsonParameter);
    }
  } catch (error) {
    alert(error);
  }
  //window.onload=InitFc();
}
/**
 * 退出登录并释放插件
 * 参数：无
 */
function DestrUct() {
  try {
    console.log(document.cookie);
    if (BrowserIsIE()) {
      //if($.isEmptyObject(ocxKq)) return;
      if (ocxKq == "" || ocxKq == null || ocxKq == undefined) {
        //console.info("ocxKq is null");
        return;
      }

      ocxKq.LoginOut();
      //ocxKq.DestroyCtrl();
      delete ocxKq;
    } else {
      // var jsonParameter = BuildJson("LoginOut");
      // createCustomEvent(jsonParameter);
      // var desJsonParameter = BuildJson("DestroyCtrl");
      // createCustomEvent(desJsonParameter);
      excuteFucOfPlugin("LoginOut", []);
      //excuteFucOfPlugin("DestroyCtrl", []);
      //desdroyPlugin();
    }
  } catch (error) {
    alert(error);
  }
  $("#div_Operate").css("display", "none");
}
function Logout() {
  try {
    if (BrowserIsIE()) {
      if (ocxKq == "" || ocxKq == null || ocxKq == undefined) {
        console.info("ocxKq is null");
        return;
      }
      ocxKq.LoginOut();
    } else {
      // var jsonParameter = BuildJson("LoginOut");
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("LoginOut", []);
    }
    $("#div_Operate").css("display", "none");
  } catch (error) {
    alert(error);
  }
}
