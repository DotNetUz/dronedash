define(['ojs/ojcore'],
function (oj) {
    
    var WebsocketFactory = {

        setWSUri: function(uri) {
            if (uri) {
                this.wsUri = uri;
            } else {
                this.wsUri = "ws://localhost:8080/ws";
            }
        },
        connectSocket: function() {
            this.setWSUri();
            this.websocket = new WebSocket(this.wsUri);
            this.websocket.onopen = function() {
                console.log('Websocket Open');
                document.getElementById("serverStatus").style.color = "#00FF00";
            };
            this.websocket.onclose = function(evt) {
                console.log('Websocket Closed');
                oj.Logger.error(event);
                document.getElementById("serverStatus").style.color = "red";
            };
            this.websocket.onerror = function(evt) {
                console.log('Websocket Error');
                oj.Logger.error(event);
            };
            // Instances of WebsocketFactory should override the onMessage function
            this.websocket.onmessage = function(evt) {
                console.log('Websocket Message - Inbound');
                oj.Logger.error(evt);
            };
            console.log('Opening socket');
        },
        getWebsocket: function() {

            if (!this.websocket) {
                this.connectSocket();
            }
            
            return this.websocket;

        }
    };

    return WebsocketFactory;

});
