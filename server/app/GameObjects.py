# -*- coding: utf-8 -*-
import uuid
import json

class Player(object):
    """
    Класс описывает модель игрока, и его взаимодействие с клиентом
    """
    def __init__(self, connection):
        """
        connection <WebSocketHandler> физическое соедениние с клиентом
        """
        self.connection = connection

    def sendToPlayer(self, message):
        """
        Отправляет сообщение клиенту
        """
        self.connection.write_message(message)

    def sendWelcomeMessage(self):
        self.sendToPlayer(json.dumps({"type":"cardReceived","card":
                                                                    {"name":"elf","health":2, "attack":2}}))

class Room(object):
    """
    Игровая комната "внутри" которой осущетсвляется игра.
    """
    rooms = {}  #Список созданных комнат

    def __init__(self, player1):
        """
        Комнату должен создать один из игроков.
        player1 <Player> игрок создавший комнату
        """
        self.id = str(uuid.uuid4())
        self.player1 = player1
        self.player2 = None
        Room.rooms[self.id]=self

    @classmethod
    def getListOfRooms(cls):
        return ["{0}:{1}".format(k,v) for k,v in cls.rooms.items()]