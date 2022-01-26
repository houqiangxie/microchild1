/**
 * 通过终端号码显示视频
 * 参数:视频号码
 */
function ShowVideByNo() {
  try {
    var no = document.getElementById("teminalNo").value;
    alert(no);
    if (BrowserIsIE()) {
      ocxKq.ShowVideo(no);
    } else {
      // var param=BuildParamJson('no',no);
      // var jsonParameter=BuildJson("ShowVideo",param);
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("ShowVideo", [no]);
    }
  } catch (error) {
    alert(error);
  }
}

function UploadVideByNo() {
  try {
    var no = document.getElementById("teminalNo").value;
    alert(no);
    if (BrowserIsIE()) {
      ocxKq.UploadVideo(no);
    } else {
      // var param = BuildParamJson("no", no);

      // var jsonParameter = BuildJson("UploadVideo", param);
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("UploadVideo", [no]);
    }
  } catch (error) {
    alert(error);
  }
}

var PtzCtrlEnum = {
  PTZ_UP: 1,
  PTZ_DOWN: 2,
  PTZ_LEFT: 3,
  PTZ_RIGHT: 4,
  PTZ_UPLEFT: 5,
  PTZ_UPRIGHT: 6,
  PTZ_DOWNLEFT: 7,
  PTZ_DOWNRIGHT: 8,
  PTZ_ZOOMIN: 9,
  PTZ_ZOOMOUT: 10,
  PTZ_STOP: 20
};

function PtzCtrl(operate) {
  try {
    var no = document.getElementById("teminalNo").value;

    if (BrowserIsIE()) {
      ocxKq.PTZControlVideo(no, operate);
    } else {
      // var param = BuildParamJson("no", no);
      // var opParam = BuildParamJson("command", operate);
      // var jsonParameter = BuildJson("PTZControlVideo", param);
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("PTZControlVideo", [no, operate]);
    }
  } catch (error) {
    alert(error);
  }
}

/**
 * 修改视频窗口左上角坐标和大小
 * 参数：x、y、width、height
 */
function EditVideoForm() {
  try {
    var x = document.getElementById("VideoFrmLocationX").value;
    var y = document.getElementById("VideoFrmLocationY").value;
    var w = document.getElementById("VideoFrmWidth").value;
    var h = document.getElementById("VideoFrmHeight").value;
    x = parseInt(x);
    y = parseInt(y);
    w = parseInt(w);
    h = parseInt(h);

    if (BrowserIsIE()) {
      ocxKq.SetVideoWindow(x, y, w, h);
    } else {
      // var xparam = BuildParamJson("x", x);
      // var yparam = BuildParamJson("y", y);
      // var wparam = BuildParamJson("width", w);
      // var hparam = BuildParamJson("height", h);
      // var jsonParameter = BuildJson(
      //   "SetVideoWindow",
      //   xparam,
      //   yparam,
      //   wparam,
      //   hparam
      // );
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("SetVideoWindow", [x, y, w, h]);
    }
  } catch (error) {
    alert(error);
  }
}

function captureVideo() {
  try {
    let captureFiel;
    captureFiel = $("#capturefile").val();
    alert(captureFiel);
    if (BrowserIsIE()) {
      let ret = ocxKq.CaptureVideoFrame(captureFiel);
      alert("视频截屏结果：" + ret);
    } else {
      // var videoSetparam = BuildParamJson("videoWindowType", videoSet);
      // var jsonParameter = BuildJson("SetVideoShow", videoSetparam);
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("CaptureVideoFrame", [captureFiel]);
    }
  } catch (error) {
    alert(error);
  }
}
function SetVideoType() {
  try {
    let videoSet = 0;
    if (document.getElementById("fourScreen").checked) {
      videoSet = 0;
    } else if (document.getElementById("sevenScreen").checked) {
      videoSet = 1;
    } else if (document.getElementById("oneScreen").checked) {
      videoSet = 2;
    }
    if (BrowserIsIE()) {
      ocxKq.SetVideoShow(videoSet);
    } else {
      // var videoSetparam = BuildParamJson("videoWindowType", videoSet);
      // var jsonParameter = BuildJson("SetVideoShow", videoSetparam);
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("SetVideoShow", [videoSet]);
    }
  } catch (error) {
    alert(error);
  }
}

function SetVideoBgcolor() {
  try {
    let colorValue;
    colorValue = $("#tbVideoBgcolor").val();
    alert(colorValue);
    if (BrowserIsIE()) {
      let ret = ocxKq.SetVideoBackgroundColorByHEX(colorValue);
    } else {
      // var videoSetparam = BuildParamJson("videoWindowType", videoSet);
      // var jsonParameter = BuildJson("SetVideoShow", videoSetparam);
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("SetVideoBackgroundColorByHEX", [colorValue]);
    }
  } catch (error) {
    alert(error);
  }
}

function SetVideoTitleBgcolor() {
  try {
    let colorValue;
    colorValue = $("#tbVideoTitleBgcolor").val();
    alert(colorValue);
    if (BrowserIsIE()) {
      let ret = ocxKq.SerVideoTitleBackgroundColorByHEX(colorValue);
    } else {
      // var videoSetparam = BuildParamJson("videoWindowType", videoSet);
      // var jsonParameter = BuildJson("SetVideoShow", videoSetparam);
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("SerVideoTitleBackgroundColorByHEX", [colorValue]);
    }
  } catch (error) {
    alert(error);
  }
}
