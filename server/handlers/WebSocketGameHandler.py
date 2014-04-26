# -*- coding: utf-8 -*-
import logging
import json

import tornado.websocket

from app.Game import Game
from app.constants import MessageType

class WebSocketGameHandler(tornado.websocket.WebSocketHandler):

    def open(self):
        Game.newPlayerConnected(self)

    def on_message(self, message):
        logging.warning("Message Received: "+message)
        try:
            parsedMessage = json.loads(message)
            messageCode = parsedMessage.get('type', None)
        except ValueError:
            logging.error("wsHandler on_message Val error: "+message)
        if messageCode == MessageType.GetCard:
            self.write_message(json.dumps({"type":"cardReceived","card":
                                                                    {"name":"Stormtrooper","health":52, "attack":72}}))
        elif messageCode == MessageType.GetListOfRoom:
            self.write_message(json.dumps({"type":"listOfRooms","rooms": Game.rooms}))
        elif messageCode == MessageType.ConnectToRoom:
            Game.createRoom(self)
            self.write_message(json.dumps({"type":"listOfRooms","rooms": str(Game.rooms)}))

    def on_close(self):
        Game.playerDisconnected(self)