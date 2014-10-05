var socket = {
    init: function(address){
        this.webSocketHost = address;
        this.webSocket = new WebSocket(this.webSocketHost);
        this.webSocket.onopen = this.handleOnOpen;
        this.webSocket.onmessage = this.handleOnMessage;
        this.webSocket.onerror = this.handleOnError;
        this.webSocket.onclose = this.handleOnClose;
    },

    sendMessage: function(message){
        if (this.webSocket.readyState === WebSocket.OPEN){
            this.webSocket.send(JSON.stringify(message));
        }
    },

    handleOnOpen: function(){
        console.log("connection Open");
        // setInterval(function(){
        //     socket.sendMessage("heartbeat");
        // },500);       
    },

    handleOnMessage: function(msg){
      console.log("Message received: "+msg.data);
      receivedData.filter(msg.data);
    },

    handleOnClose: function(event){
        console.log("Connection closed. Code: " + event.code);
    },

    handleOnError: function(error){
        console.log(error);
        console.log("WS: ERROR occured "+error);
    }
};
