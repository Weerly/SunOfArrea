# -*- coding: utf-8 -*-
import sys
import logging
import json

from GameObjects import *
from exceptions import *

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
        """ Если отключившийся игрок был в комнате, информировать комнату. """
        player = cls.players.pop(connection, None)
        room = player.room or None
        if room:
            room.playerDisconnected(player)
        logging.info("Players list: "+str(cls.players))

    @classmethod
    def destroyRoom(cls, connection):
        player = cls.players.get(connection, None)
        room = player.room or None
        #Только создатель комнаты имеет полномочия разрушить ее
        if room.player1 == player:
            room.destroyRoom()
            player.notifyPlayer(Message.SUCCESS)
        else:
            player.notifyPlayer(Message.Error, "you don't have permission")

    @classmethod
    def createRoom(cls, connection, roomName = None):
        """
        Иницирует создание игровой комнаты.
        Если игрок не играет в другой комнате, создает комнату,
        передает текущего игрока как создателя комнаты,
        и помечает игрока как играющего.

        Возвращает id созданной комнаты, иначе
        raise PlayerException
        """
        player = cls.players.get(connection, None)
        if player.room is None:
            r = Room(player, roomName)
            player.room = r
            return r.id
        else:
            raise PlayerException("This user already in the room")

    @classmethod
    def connectToRoom(cls, connection, parsedMessage):
        """
        Добавляет игрока к уже созданной комнате.
        parsedMessage <dict> сообщение содержащее ид комнаты для подключения.
        """
        #get room id connect to
        id = parsedMessage.get("id", None)
        player = cls.players.get(connection, None)
        if id and player:
            room = Room.getRoomById(id)
            if room.addPlayerToRoom(player):
                #all OK. return room info
                return room.getRoomInfo()
        else:
            logging.error("Game.connectToRoom() id or player is not right")
            return None

    @classmethod
    def notifyAllPlayers(cls, message):
        for k in cls.players:
            cls.players[k].sendToPlayer(message)
