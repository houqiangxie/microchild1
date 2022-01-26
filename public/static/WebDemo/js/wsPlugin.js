var port = 14321;
var verifyResult = false; //连接验证码
var waitVerifyCallback = false;
let connectCount = 0;
function initPlugin() {
  try {
    var wsImpl = window.WebSocket || window.MozWebSocket;
    // create a new websocket and connect
    if (port > 65535) port = 1024;
    window.ws = new wsImpl("ws://localhost:" + port);
    
    // when data is comming from the server, this metod is called
    // when the connection is established, this method is called
    ws.onopen = function () {
      // when the connection is closed, this method is called
      
      ws.onmessage = function (evt) {
        
        callbackInfo(evt.data);
      };
      SendMethod("VerifyWebSoket", []); //send verify method
      waitVerifyCallback = true;
      setTimeout(function () {
        if (!verifyResult) {
          ws.onmessage = null;
          ws.close();
          waitVerifyCallback = false;
          StartNewPoint();
        }
      }, 1000);
    };
    ws.onclose = function () {
      
      $("#connStatus").css("background-color", "red");
    };
    ws.onerror = function (event) {
      connectCount++;
      if (!waitVerifyCallback && connectCount<6) setTimeout(StartNewPoint, 500);
    };
  } catch (error) {
    
    StartNewPoint();
    return;
  }
}
// 连接新端口
function StartNewPoint() {
  // port += 1;
  initPlugin();
}
function excuteFucOfPlugin(method, paras) {
  // alert(method)
  // alert(paras)

  if (verifyResult && ws.readyState === WebSocket.OPEN) {
    
    SendMethod(method, paras);
  } else {
    
  }
}
function SendMethod(method, paras) {
  let jobj = {
    method: method,
    paramArray: paras,
  };
  let jStr = JSON.stringify(jobj);
  
  ws.send(jStr);
}
