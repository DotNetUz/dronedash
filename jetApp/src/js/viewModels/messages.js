/**
 * messages module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojbutton', 'factories/WebsocketFactory',
        'viewModels/animation', 'ojs/ojinputtext', 'ojs/ojformlayout'
], function (oj, ko, io, WebsocketFactory, Animation) {
    /**
     * The view model for the messages view template
     */

    function MessagesViewModel() {

        var self = this;
        self.messageArray = ko.observableArray();
        self.yawAmount = ko.observable("0");
        self.rollAmount = ko.observable("0");
        self.pitchAmount = ko.observable("0");
        self.gazAmount = ko.observable("0");

        var i = 0;
        var websocket = WebsocketFactory.getWebsocket();

        self.addMessage = function (message) {

            var array = self.messageArray();
            
            i = i + 1;
            array.push({
                "id": i,
                "yaw": message.movement.yaw,
                "roll": message.movement.roll,
                "pitch": message.movement.pitch,
                "gaz": message.movement.gaz
            });

            self.messageArray(array);

        };

        websocket.onmessage = function (event) {

            if (event.data) {

                var message = JSON.parse(event.data);

                self.addMessage(message);
                Animation.onMessage(message.movement.pitch, message.movement.yaw, message.movement.roll);

            }

        };

        self.emitMessage = function() {

            var command = {
                "yaw": self.yawAmount(),
                "roll": self.rollAmount(),
                "pitch": self.pitchAmount(),
                "gaz": self.gazAmount()
            };

            websocket.send(JSON.stringify(command));

        };

    };
    
    return new MessagesViewModel();

});
