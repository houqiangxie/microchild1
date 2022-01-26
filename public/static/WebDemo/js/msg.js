/**
 *设置获取案例
 *  {"cmd":"Msg","type":"MsgReceive","msgid":"ccc64308-a34e-4f3f-8962-82b3b89f322a","code":"info","msg":{"sender":"21008","gid":"","deliver":null,"smsid":null,"content":{"msgId":null,"msgConfirmMode":0,"msgSendType":0,"msgSender":null,"msgReceiver":null,"msgSendTime":0,"infoType":49,"fileName":null,"serverName":null,"serverPath":null,"fileSize":0,"fileDuration":0,"msgContent":null,"exContent":{"type":0,"index":0,"result":null,"datas":[{"index":1,"name":"视频参数设置","canSet":true,"items":[{"name":"codec","desc":"视频格式优选","type":3,"cValue":"0","define":"0=H264;1=H265","canSet":true},{"name":"resolution","desc":"分辨率","type":3,"cValue":"640×480","define":"320×240=流畅(320×240);640×480=标清(640×480);1280×720=高清(1280×720);1920×1080=超高清(1920×1080)","canSet":true},{"name":"frame","desc":"帧率","type":3,"cValue":"15fps","define":"5fps=5fps;15fps=15fps;20fps=20fps;25fps=25fps","canSet":true},{"name":"rate","desc":"码率","type":2,"cValue":"300","define":"128-8000","canSet":false},{"name":"camera","desc":"摄像头选择","type":3,"cValue":"0","define":"0=后置摄像头;1=前置摄像头;2=外置摄像头;3=HDMI","canSet":true},{"name":"autoReceiveVideo","desc":"自动接收视频","type":3,"cValue":"1","define":"1=打开;0=关闭","canSet":true}]},{"index":2,"name":"定位参数设置","canSet":true,"items":[{"name":"switch","desc":"定位开关","type":3,"cValue":"0","define":"0=关闭;1=打开","canSet":true},{"name":"interval","desc":"上报时间间隔","type":2,"cValue":"30","define":"2-3600","canSet":true},{"name":"signal","desc":"信号情况","type":3,"cValue":"1","define":"0=无信号;1=信号正常","canSet":false},{"name":"serverIp","desc":"GPS服务器IP","type":0,"cValue":"192.168.4.5","define":"","canSet":false},{"name":"serverPort","desc":"GPS服务器端口","type":2,"cValue":"8085","define":"0-65535","canSet":false}]},{"index":3,"name":"锁定组设置","canSet":true,"items":[{"name":"21000","desc":"测试一组(21000)是否锁定","type":3,"cValue":"0","define":"0=未锁定;1=锁定","canSet":true}]},{"index":4,"name":"终端升级","canSet":true,"items":[{"name":"upgradeSwitch","desc":"自动升级开关","type":3,"cValue":"1","define":"0=关闭;1=打开","canSet":true}]},{"index":5,"name":"日志管理","canSet":true,"items":[{"name":"appLogSwitch","desc":"终端日志开关","type":3,"cValue":"0","define":"0=关闭;1=打开","canSet":true}]},{"index":6,"name":"低电报警","canSet":true,"items":[{"name":"lowBatteryCurrentLevel","desc":"当前电量","type":0,"cValue":"40","define":"","canSet":false},{"name":"lowBatterySwitch","desc":"低电报警开关","type":3,"cValue":"0","define":"0=关闭;1=打开","canSet":true},{"name":"lowBatteryTriggerLevel","desc":"低电报警触发电量(%)","type":0,"cValue":"20","define":"","canSet":true},{"name":"lowBatteryTriggerCycle","desc":"低电报警触发周期(分钟)","type":0,"cValue":"10","define":"","canSet":true},{"name":"lowBatteryReportNum","desc":"低电报警上报号码（多个号码之间以#隔开）","type":0,"cValue":"","define":"","canSet":true}]},{"index":7,"name":"版本信息","canSet":false,"items":[{"name":"versionInfo","desc":"终端版本信息查询","type":1,"cValue":"PRODUCT : 【9100Q】;\nAPPVERSION : 【V5.0.009.1.190527】;\nDLL : 【V5.2.12 (Built at Jan 23 2019)】;\nMODEL : 【PTM9100Q】;\nRELEASE : 【6.0.1】;\nSYSTEM : 【V01.00.01.02.20170807】;\nGID : 【】;\n","define":"","canSet":true}]}]}}},"date":"2019-07-22 10:41:00"}
 */
/**
 * 获取终端所有设置
 */
function GetAllSetting() {
  try {
    var pcDst = $("#teminalNo").val();
    alert(pcDst);
    var excutRet = ocxKq.GetAllSettingFromTerminal(pcDst);
    if (excutRet != 0) {
      $("#msgContent").val("");
      $("#div_ShowMSG").append(
        "<div id='msgdiv_" +
          excutRet +
          "' style='width=95%'>发送结果为：" +
          excutRet +
          " </div>"
      );
    } else alert("信息发送失败！");
  } catch (error) {
    alert("GetAllSetting:" + error);
  }
}
/**
 *  获取终端某项设置
 */
function GetTypeSetting() {
  try {
    var pcDst = $("#teminalNo").val();
    var typeIndex = $("#tb_SettingType").val();
    alert(pcDst + " index:" + typeIndex);
    var excutRet = ocxKq.GetOneSettingFromTerminal(pcDst, typeIndex);
    if (excutRet != 0) {
      $("#msgContent").val("");
      $("#div_ShowMSG").append(
        "<div id='msgdiv_" +
          excutRet +
          "' style='width=95%'>发送结果为：" +
          excutRet +
          " </div>"
      );
    } else alert("信息发送失败！");
  } catch (error) {
    alert("GetTypeSetting:" + error);
  }
}
//设置某项
function SetTerminalSetting() {
  try {
    var pcDst = $("#teminalNo").val();
    var typeIndex = $("#tb_SettingType").val();
    var setingName = $("#tb_SettingName").val();
    var setingValue = $("#tb_SettingValue").val();
    alert(
      pcDst +
        " index:" +
        typeIndex +
        " setingName：" +
        setingName +
        " setingValue:" +
        setingValue
    );
    var excutRet = ocxKq.SetTerminalSetting(
      pcDst,
      typeIndex,
      setingName,
      setingValue
    );
    if (excutRet != 0) {
      $("#msgContent").val("");
      $("#div_ShowMSG").append(
        "<div id='msgdiv_" +
          excutRet +
          "' style='width=95%'>发送结果为：" +
          excutRet +
          " </div>"
      );
    } else alert("信息发送失败！");
  } catch (error) {
    alert("SetTerminalSetting:" + error);
  }
}
/**
 * 发送消息
 */
function SendMSG1(msgType, InfoType, InfoSeq) {
  try {
    var pcDst;
    if (msgType == 0) pcDst = $("#teminalNo").val();
    else pcDst = $("#groupNo").val();
    var SRCDN = $("#userName").val();
    var curDate = new Date();
    var chSmsId =
      curDate.format("yyyyMMddhhmmss") + "00_" + pcDst + "_" + SRCDN;
    var RecvCfm = 1;
    var RecvNotify = 0;
    var chMsgContent = $("#msgContent").val();
    var id = "msgdiv_" + chSmsId;
    smsid = chSmsId;
    div_id = id;
    $("#div_ShowMSG").append(
      "<div id='" +
        id +
        "' style='width=95%'>发送给 " +
        pcDst +
        " ：<br> " +
        chMsgContent +
        " </div>"
    );
    var contentObj = {
      msgId: chSmsId,
      msgConfirmMode: 0,
      msgSendType: msgType,
      msgSender: SRCDN,
      msgReceiver: pcDst,
      msgSendTime: parseInt(new Date().getTime() / 1000),
      //"msgSendTime":(new Date()).getTime()/1000,
      infoType: InfoType,
      fileName: "",
      serverName: "",
      serverPath: "",
      fileSize: 0,
      fileDuration: 0,
      msgContent: chMsgContent,
      exContent: null,
    };
    var gArray = [];
    var uArray = [];
    if (msgType == 0) {
      uArray = [pcDst];
      gArray = null;
    } else {
      gArray = [pcDst];
      uArray = null;
    }
    var jsonObj = {
      glist: gArray,
      ulist: uArray,
      deliver: 0,
      content: JSON.stringify(contentObj),
    };
    if (BrowserIsIE()) {
      //var msgStr="SendMSG("+msgType+",'"+pcDst+"','"+chSmsId+"',"+InfoType+","+InfoSeq+","+RecvCfm+","+RecvNotify+",'"+chMsgContent+"')";

      var excutRet = ocxKq.SendMSGForJSonString(JSON.stringify(jsonObj));

      //chSmsDic.put(chSmsId,id);
      if (excutRet != 0) {
        $("#msgContent").val("");
        $("#div_ShowMSG").append(
          "<div id='msgdiv_" +
            excutRet +
            "' style='width=95%'>发送结果为：" +
            excutRet +
            " </div>"
        );
      } else alert("信息发送失败！");
    } else {
      // var msgTypeParam=BuildParamJson('msgType',msgType);
      // var pcDstParam=BuildParamJson('pcDst',pcDst);
      // var chSmsIdParam=BuildParamJson('chSmsId',chSmsId);
      // var InfoTypeParam=BuildParamJson('InfoType',InfoType);
      // var InfoSeqParam=BuildParamJson('InfoSeq',InfoSeq);
      // var RecvCfmParam=BuildParamJson('RecvCfm',RecvCfm);
      // var RecvNotifyParam=BuildParamJson('RecvNotify',RecvNotify);
      // var chMsgContentParam=BuildParamJson('chMsgContent',chMsgContent);
      // var desJsonParameter=BuildJson("SendMSG",msgTypeParam,pcDstParam,chSmsIdParam,InfoTypeParam,InfoSeqParam,RecvCfmParam,RecvNotifyParam,chMsgContentParam);
      // createCustomEvent(desJsonParameter);
      excuteFucOfPlugin("SendMSGForJSonString", [JSON.stringify(jsonObj)]);
    }
  } catch (error) {
    alert(error);
  }
}

function SendMSG2(msgType, InfoType, InfoSeq) {
  try {
    var pcDst;
    if (msgType == 0) pcDst = $("#teminalNo").val();
    else pcDst = $("#groupNo").val();
    var SRCDN = $("#userName").val();
    var curDate = new Date();
    var chSmsId;
    var RecvCfm = 1;
    var RecvNotify = 0;
    var chMsgContent = $("#msgContent").val();
    var id = "msgdiv_" + chSmsId;
    smsid = chSmsId;
    var fileName;
    if (InfoType != 0) {
      chSmsId = fileChSmsId;
      fileName = $("#fileDilog").val();
      if (fileName == "" || fileName == null) {
        alert("文件不能为空！");
        return;
      }
    } else {
      chSmsId = curDate.format("yyyyMMddhhmmss") + "00_" + pcDst + "_" + SRCDN;
    }
    div_id = id;
    $("#div_ShowMSG").append(
      "<div id='" +
        id +
        "' style='width=95%'>发送给 " +
        pcDst +
        " ：<br> " +
        chMsgContent +
        " </div>"
    );

    if (BrowserIsIE()) {
      var excutRet;
      if (InfoType == 0) {
        alert("文本信息");
        excutRet = ocxKq.SendMSGForV5(
          msgType,
          pcDst,
          chSmsId,
          InfoType,
          RecvCfm,
          chMsgContent,
          "",
          0
        );
      } else {
        alert("文件信息" + fileName);
        excutRet = ocxKq.SendMSGForV5(
          msgType,
          pcDst,
          chSmsId,
          InfoType,
          RecvCfm,
          chMsgContent,
          fileName,
          0
        );
      }
      //chSmsDic.put(chSmsId,id);
      if (excutRet != 0) {
        $("#msgContent").val("");
        $("#div_ShowMSG").append(
          "<div id='msgdiv_" +
            excutRet +
            "' style='width=95%'>发送结果为：" +
            excutRet +
            " </div>"
        );
      } else alert("信息发送失败！");
    } else {
      // var msgTypeParam = BuildParamJson("msgType", msgType);
      // var pcDstParam = BuildParamJson("pcDst", pcDst);
      // var chSmsIdParam = BuildParamJson("chSmsId", chSmsId);
      // var InfoTypeParam = BuildParamJson("InfoType", InfoType);
      // var InfoSeqParam = BuildParamJson("InfoSeq", InfoSeq);
      // var RecvCfmParam = BuildParamJson("RecvCfm", RecvCfm);
      // var RecvNotifyParam = BuildParamJson("RecvNotify", RecvNotify);
      // var chMsgContentParam = BuildParamJson("chMsgContent", chMsgContent);
      // var desJsonParameter = BuildJson(
      //   "SendMSG",
      //   msgTypeParam,
      //   pcDstParam,
      //   chSmsIdParam,
      //   InfoTypeParam,
      //   InfoSeqParam,
      //   RecvCfmParam,
      //   RecvNotifyParam,
      //   chMsgContentParam
      // );
      // createCustomEvent(desJsonParameter);
      if (InfoType == 0) {
        excuteFucOfPlugin("SendMSGForV5", [
          msgType,
          pcDst,
          chSmsId,
          InfoType,
          RecvCfm,
          chMsgContent,
          "",
          0,
        ]);
      } else {
        alert("文件信息" + fileName);
        excuteFucOfPlugin("SendMSGForV5", [
          msgType,
          pcDst,
          chSmsId,
          InfoType,
          RecvCfm,
          chMsgContent,
          fileName,
          "0",
        ]);
      }
    }
  } catch (error) {
    alert(error);
  }
}
function SendMSG3(msgType, InfoType, InfoSeq) {
  try {
    var pcDst;
    if (msgType == 0) pcDst = $("#teminalNo").val();
    else pcDst = $("#groupNo").val();
    var SRCDN = $("#userName").val();
    var curDate = new Date();
    var chSmsId =
      curDate.format("yyyyMMddhhmmss") + "00_" + pcDst + "_" + SRCDN;
    var RecvCfm = 1;
    var RecvNotify = 0;
    var chMsgContent = $("#msgContent").val();
    var id = "msgdiv_" + chSmsId;
    smsid = chSmsId;
    div_id = id;
    var fileName;
    if (InfoType != 0) {
      chSmsId = fileChSmsId;
      fileName = $("#fileDilog").val();
      if (fileName == "" || fileName == null) {
        alert("文件不能为空！");
        return;
      }
    } else {
      chSmsId = curDate.format("yyyyMMddhhmmss") + "00_" + pcDst + "_" + SRCDN;
    }
    $("#div_ShowMSG").append(
      "<div id='" +
        id +
        "' style='width=95%'>发送给 " +
        pcDst +
        " ：<br> " +
        chMsgContent +
        " </div>"
    );

    if (BrowserIsIE()) {
      var excutRet = ocxKq.SendMSG(
        msgType,
        pcDst,
        chSmsId,
        InfoType,
        InfoSeq,
        RecvCfm,
        RecvNotify,
        chMsgContent
      );
      //var excutRet=ocxKq.SendMSG(0, "8031","2019042811120200_8001_8031", 0,0, 1, 0, "333221111");
      if (excutRet != 0) {
        $("#msgContent").val("");
        $("#div_ShowMSG").append(
          "<div id='msgdiv_" +
            excutRet +
            "' style='width=95%'>发送结果为：" +
            excutRet +
            " </div>"
        );
      } else alert("信息发送失败！");
    } else {
      // var msgTypeParam = BuildParamJson("msgType", msgType);
      // var pcDstParam = BuildParamJson("pcDst", pcDst);
      // var chSmsIdParam = BuildParamJson("chSmsId", chSmsId);
      // var InfoTypeParam = BuildParamJson("InfoType", InfoType);
      // var InfoSeqParam = BuildParamJson("InfoSeq", InfoSeq);
      // var RecvCfmParam = BuildParamJson("RecvCfm", RecvCfm);
      // var RecvNotifyParam = BuildParamJson("RecvNotify", RecvNotify);
      // var chMsgContentParam = BuildParamJson("chMsgContent", chMsgContent);
      // var desJsonParameter = BuildJson(
      //   "SendMSG",
      //   msgTypeParam,
      //   pcDstParam,
      //   chSmsIdParam,
      //   InfoTypeParam,
      //   InfoSeqParam,
      //   RecvCfmParam,
      //   RecvNotifyParam,
      //   chMsgContentParam
      // );
      // createCustomEvent(desJsonParameter);
      excuteFucOfPlugin("SendMSGForV5", [
        msgType,
        pcDst,
        chSmsId,
        InfoType,
        RecvCfm,
        chMsgContent,
        fileName,
        "0",
      ]);
    }
  } catch (error) {
    alert(error);
  }
}
function SendMSG4(msgType, InfoType, InfoSeq) {
  try {
    var pcDsts = $("#tbsendMsgNos").val();
    var SRCDN = $("#userName").val();
    var curDate = new Date();
    var chSmsId;
    var RecvCfm = 1;
    var RecvNotify = 0;
    var chMsgContent = $("#msgContent").val();
    var id = "msgdiv_" + chSmsId;
    smsid = chSmsId;
    var fileName;
    if (InfoType != 0) {
      chSmsId = fileChSmsId;
      fileName = $("#fileDilog").val();
      if (fileName == "" || fileName == null) {
        alert("文件不能为空！");
        return;
      }
    } else {
      chSmsId =
        curDate.format("yyyyMMddhhmmss") +
        "00_" +
        pcDsts.split(",")[0] +
        "_" +
        SRCDN;
    }
    div_id = id;
    $("#div_ShowMSG").append(
      "<div id='" +
        id +
        "' style='width=95%'>发送给 " +
        pcDsts +
        " ：<br> " +
        chMsgContent +
        " </div>"
    );

    if (BrowserIsIE()) {
      var excutRet;
      if (InfoType == 0) {
        alert("文本信息");
        excutRet = ocxKq.SendMSGsForV5(
          msgType,
          pcDsts,
          chSmsId,
          InfoType,
          RecvCfm,
          chMsgContent,
          "",
          0
        );
      } else {
        alert("文件信息" + fileName);
        excutRet = ocxKq.SendMSGsForV5(
          msgType,
          pcDsts,
          chSmsId,
          InfoType,
          RecvCfm,
          chMsgContent,
          fileName,
          0
        );
      }
      //chSmsDic.put(chSmsId,id);
      if (excutRet != 0) {
        $("#msgContent").val("");
        $("#div_ShowMSG").append(
          "<div id='msgdiv_" +
            excutRet +
            "' style='width=95%'>发送结果为：" +
            excutRet +
            " </div>"
        );
      } else alert("信息发送失败！");
    } else {
      if (InfoType == 0) {
        alert("文本信息");
        excuteFucOfPlugin("SendMSGsForV5", [
          msgType,
          pcDsts,
          chSmsId,
          InfoType,
          RecvCfm,
          chMsgContent,
          "",
          "0",
        ]);
      } else {
        alert("文件信息" + fileName);
        excuteFucOfPlugin("SendMSGsForV5", [
          msgType,
          pcDsts,
          pcDsts,
          InfoType,
          RecvCfm,
          chMsgContent,
          fileName,
          "0",
        ]);
      }
    }
  } catch (error) {
    alert(error);
  }
}
/**
 * 确认消息
 */
function ConfirmMSG(msgType, pcDst, chSmsId, infoSeq) {
  try {
    if (BrowserIsIE()) {
      var excutRet = ocxKq.ReceivedMSG(msgType, pcDst, chSmsId, infoSeq, 1);
      if (!excutRet) alert("确认消息失败！");
    } else {
      // var msgTypeParam = BuildParamJson("msgType", msgType);
      // var pcDstParam = BuildParamJson("pcDst", pcDst);
      // var chSmsIdParam = BuildParamJson("chSmsId", chSmsId);
      // var infoSeqParam = BuildParamJson("infoSeq", infoSeq);
      // var jsonParameter = BuildJson(
      //   "ReceivedMSG",
      //   msgTypeParam,
      //   pcDstParam,
      //   chSmsIdParam,
      //   infoSeqParam
      // );
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("ReceivedMSG", [msgType, pcDst, chSmsId, infoSeq, 1]);
    }
  } catch (error) {
    alert(error);
  }
}

function ShowMSG() {
  try {
    if (BrowserIsIE()) {
      var showmsg = ocxKq.ShowMsgWindow();
    } else {
      // var jsonParameter = BuildJson("ShowMsgWindow");
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("ShowMsgWindow", []);
    }
  } catch (error) {
    alert(error);
  }
}
var fileChSmsId;
function MSGUploadFile() {
  try {
    var pcDst = $("#teminalNo").val();
    var SRCDN = $("#userName").val();
    var curDate = new Date();
    fileChSmsId =
      curDate.format("yyyyMMddhhmmss") + "00_" + pcDst + "_" + SRCDN;
    var fileName = $("#fileDilog").val();
    if (BrowserIsIE()) {
      var UploadFileRet = ocxKq.UploadFile(pcDst, fileName, fileChSmsId);
      if (UploadFileRet != 0) alert("上传操作失败：" + UploadFileRet);
      else
        alert(
          "文件上传成功:pcDst-" +
            pcDst +
            " fileName-" +
            fileName +
            " chSmsId-" +
            fileChSmsId
        );
    } else {
      // var pcDstparam = BuildParamJson("pcDst", pcDst);
      // var fileNameparam = BuildParamJson("fileName", fileName);
      // var chSmsIdparam = BuildParamJson("chSmsId", fileChSmsId);
      // var jsonParameter = BuildJson(
      //   "UploadFile",
      //   pcDstparam,
      //   fileNameparam,
      //   chSmsIdparam
      // );
      // createCustomEvent(jsonParameter);

      excuteFucOfPlugin("UploadFile", [pcDst, fileName, fileChSmsId]);
    }
  } catch (error) {
    alert(error);
  }
}

function MSGDownloadFile() {
  try {
    var remoteFile = $("#tbRemoteDownFile").val();
    var chSmsId = $("#tbDownFileChSmsID").val();
    var localFile = $("#tbLocalDownFile").val();
    alert(
      "chSmsId:" +
        chSmsId +
        " remoteFile:" +
        remoteFile +
        " localFile:" +
        localFile
    );

    if (BrowserIsIE()) {
      var downloadFileRet = ocxKq.DownLoadFiel(chSmsId, remoteFile, localFile);
      if (downloadFileRet != 0) alert("下载操作失败：" + downloadFileRet);
    } else {
      // var chSmsIdparam = BuildParamJson("chSmsId", chSmsId);
      // var remoteFileparam = BuildParamJson("remoteFile", remoteFile);
      // var localFileparam = BuildParamJson("localFile", localFile);
      // var jsonParameter = BuildJson(
      //   "DownLoadFiel",
      //   chSmsIdparam,
      //   remoteFileparam,
      //   localFileparam
      // );
      // createCustomEvent(jsonParameter);
      excuteFucOfPlugin("DownLoadFiel", [chSmsId, remoteFile, localFile]);
    }
  } catch (error) {
    alert(error);
  }
}

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
