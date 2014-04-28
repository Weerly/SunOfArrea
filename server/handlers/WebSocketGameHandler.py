# -*- coding: utf-8 -*-
import logging
import json

import tornado.websocket

from app.Game import Game
from app.GameObjects import Room
from app.constants import Message
from app.exceptions import *

class WebSocketGameHandler(tornado.websocket.WebSocketHandler):

    def open(self):
        Game.newPlayerConnected(self)

    def on_message(self, message):
        logging.warning("Message Received: "+message)
        messageCode = None
        try:
            parsedMessage = json.loads(message)
            messageCode = parsedMessage.get('type', None)
        except AttributeError:
            logging.error("wsHandler on_message AttributeError. Message: "+message)
            self.write_message(json.dumps({"type":Message.CriticalError,
                                           "description":"JSON AttributeError.", "message":message}))
        except ValueError:
            logging.error("wsHandler on_message Val error: "+message)

        if messageCode == Message.GetCard:
            self.write_message(json.dumps({"type":"cardReceived","card":
                                                                    {"name":"Stormtrooper","health":52, "attack":72}}))
        elif messageCode == Message.GetListOfRoom:
            self.write_message(json.dumps({"type":"listOfRooms","rooms": Room.getListOfRooms()}))

        elif messageCode == Message.CreateRoom:
            #Возвращает id комнаты, или сообщает что игрок в другой комнате.
            roomName = parsedMessage.get('name', None)
            try:
                roomId = Game.createRoom(self, roomName)
            except PlayerException as e:
                self.write_message(json.dumps({"type":Message.Error,"description": e.value}))
                logging.warning(e.value)
                logging.critical(Room.rooms)
            else:
                self.write_message(json.dumps({"type":Message.RoomCreated,"id": roomId}))

    def on_close(self):
        Game.playerDisconnected(self)