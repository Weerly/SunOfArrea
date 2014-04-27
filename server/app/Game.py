# -*- coding: utf-8 -*-
import sys
import logging
import json

from GameObjects import *

class Game(object):
    """
    Основной класс игры содержащий список всех подключений.
    """
    players = {}    #list of all connected players


    @classmethod
    def newPlayerConnected(cls, connection):
        """
        Add connection to connections
        """
        p = Player(connection)
        cls.players[connection] =  p
        p.sendWelcomeMessage()
        logging.info("Game.players: "+str(cls.players))

    @classmethod
    def playerDisconnected(cls, connection):
        cls.players.pop(connection, None)
        logging.info(cls.players)

    @classmethod
    def createRoom(cls, connection):
        r = Room(connection)