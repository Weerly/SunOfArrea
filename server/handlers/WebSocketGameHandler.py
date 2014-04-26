# -*- coding: utf-8 -*-
import logging
import json

import tornado.websocket

from app.Game import Game

class WebSocketGameHandler(tornado.websocket.WebSocketHandler):

    def open(self):
        Game.newPlayerConnected(self)
        logging.warning(Game.connections)

    def on_message(self, message):
        logging.warning("Received: "+message)
        try:
            parsedMessage = json.loads(message)
            messageCode = parsedMessage.get('type', None)
        except ValueError:
            logging.error("wsHandler on_message Val error: "+message)
        if messageCode == 1:
            self.write_message(json.dumps({"type":"cardReceived","card":
                                                                    {"name":"Stormtrooper","health":52, "attack":72}}))
        elif messageCode == 2:
            self.write_message(json.dumps({"type":"listOfRooms","rooms": Game.rooms}))
        elif messageCode == 3:
            self.write_message(json.dumps({"type":"listOfRooms","rooms": str(Game.rooms)}))

    def on_close(self):
        Game.playerDisconnected(self)
        logging.warning(Game.connections)