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
        Метод из обьекта подключения создает игрока, и добавляет его в список игроков.
        Если все успешно игроку отправляется приветственное сообщение.
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
        """
        Иницирует создание игровой комнаты.
        Передает текущего игрока как создателя комнаты.
        """
        player = cls.players.get(connection, None)
        if player:
            r = Room(player)