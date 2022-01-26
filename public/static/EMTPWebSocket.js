"use strict";

function EMTPWebSocket(url)
{    
    this.transport = undefined;
    this.url = url;
    this.isConneting = false;
    this.re_connectTimeout = 3000;
    this.KeepAlive_interval = 60 * 1000;
    this.heart_interval_id = 0;
    this.re_connect_timeout_id = 0;
    this.wait_send_msg = undefined;
}    

EMTPWebSocket.prototype.tryConnect = function()
{
    if(this.transport !== undefined)
        return;
    if(this.isConneting)
        return;
    var tTHis = this;
    this.isConneting = true;
    try{
        var echoSocket = new WebSocket(this.url,[]);
        echoSocket.onopen = function(e) 
        {
            tTHis.socket_onopen(echoSocket,e);
        }
        echoSocket.onerror = function(e)
        {
            tTHis.socket_onerror(echoSocket,e);
        }
    }
    catch(error)
	{ 
        this.isConneting  = false;
        socket_reconnect();
	}
};

EMTPWebSocket.prototype.socket_reconnect = function()
{
    if(this.re_connect_timeout_id != 0)
    {
        window.clearTimeout(this.re_connect_timeout_id);
        this.re_connect_timeout_id = 0;
    }
    var tThis = this;
    this.re_connect_timeout_id = window.setTimeout(
        function()
        { 
            tThis.tryConnect();
        },this.re_connectTimeout); 
}

EMTPWebSocket.prototype.socket_onerror = function(echoSocket,e)
{
    
    this.isConneting  = false;
    if(this.transport !== undefined && echoSocket !== this.transport)
        return ;
    if(this.heart_interval_id != 0)
        clearInterval(this.heart_interval_id );
    this.heart_interval_id  = 0;
    this.transport = undefined;
    this.socket_reconnect();
}

EMTPWebSocket.prototype.socket_onopen= function(echoSocket,e)
{
    this.isConneting  = false;
    var protocol = echoSocket.protocol;
    this.transport = echoSocket;
    var tThis = this;
    echoSocket.onmessage = function(e)
    {
        tThis.socket_onmessage(echoSocket,e);
    };
    echoSocket.onclose = function(e)
    {
        tThis.socket_onclose(echoSocket,e);
    };

    if(this.heart_interval_id != 0)
        clearInterval(this.heart_interval_id );
    this.heart_interval_id  = 0;

    this.heart_interval_id = setInterval(
        function(){ 
            tThis.sendMessage({action:"KeepAlive"});
        }, this.KeepAlive_interval);

    if(this.wait_send_msg !== undefined)
    {
        this.sendMessage(this.wait_send_msg);
        this.wait_send_msg = undefined;
    }
};

EMTPWebSocket.prototype.socket_onmessage= function(echoSocket,e)
{
    var data = e.data;
    //alert(data);
    var obj = JSON.parse(data);
}

EMTPWebSocket.prototype.socket_onclose= function(echoSocket,e)
{
    this.isConneting = false;
    if(this.transport !== undefined && echoSocket !== this.transport )
        return;
    if(this.heart_interval_id != 0)
        clearInterval(this.heart_interval_id );
    this.heart_interval_id  = 0;
    this.transport = undefined;
    this.socket_reconnect();
}


EMTPWebSocket.prototype.sendMessage = function(obj,bResend)
{
    if(this.transport === undefined)
    {
        if(bResend === true)
        {
            this.wait_send_msg = obj;
        }
        this.tryConnect();
        return;
    }
    var msg = JSON.stringify(obj);
	this.transport.send(msg);
};

var g_EMTPWebSocket= new EMTPWebSocket("");

function EMTPWebChannel_Init(url)
{
    g_EMTPWebSocket.url = url;
    g_EMTPWebSocket.tryConnect();
}

function EMTPWebChannel_CallBack(action,obj)
{
    try
	{
        obj.action = action;
        g_EMTPWebSocket.sendMessage(obj,"open_dis" == action || "close_dis" == action);
	}
	catch(error)
	{ 

	}
}