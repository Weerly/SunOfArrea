# -*- coding: utf-8 -*-
import tornado.websocket

from app.Game import Game

class WebSocketGameHandler(tornado.websocket.WebSocketHandler):

    def open(self):
        Game.newPlayerConnected(self)

    def on_message(self, message):
        Game.parseMessage(self, message)

    def on_close(self):
        Game.playerDisconnected(self)