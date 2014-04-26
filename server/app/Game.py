# -*- coding: utf-8 -*-
import sys
import logging
import json

from GameObjects import *

class Game(object):
    """
    Основной класс игры содержащий список всех подключений.
    """
    connections = []    #list of all connected players
    rooms = {}


    @classmethod
    def newPlayerConnected(cls, connection):
        """
        Add connection to list of connections
        """
        cls.connections.append(connection)
        try:
            connection.write_message(json.dumps({"type":"cardReceived","card":{"name":"elf","health":2, "attack":1}}))
            logging.info(cls.connections)
        except ValueError:
            logging.error(" - wsOpen "+str(sys.exc_info()[0]))

    @classmethod
    def playerDisconnected(cls, connection):
        try:
            cls.connections.remove(connection)
        except ValueError, e:
            logging.error("playerDisconnected: player not in a list")
        logging.info(cls.connections)
