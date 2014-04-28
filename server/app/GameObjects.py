# -*- coding: utf-8 -*-
import uuid
import json

class Player(object):
    """
    Класс описывает модель игрока, и его взаимодействие с клиентом
    """
    def __init__(self, connection, name= "Anonymous"):
        """
        connection <WebSocketHandler> физическое соедениние с клиентом
        name <string> имя игрока
        """
        self.connection = connection
        self.name = name
        self.room = None    #комната в которой сейчас находится игрок

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

    def __init__(self, player1, roomName=None):
        """
        Создает комнату с одним игроком.
        player1 <Player> игрок создавший комнату
        """
        self.id = str(uuid.uuid4())
        self.roomName = roomName
        self.player1 = player1
        self.player2 = None
        Room.rooms[self.id]=self #Добавить комнату в список созданных

    @classmethod
    def getListOfRooms(cls):
        mes = []
        for k in cls.rooms:
            roomData = {
                "id"    : cls.rooms[k].id,
                "name"  : cls.rooms[k].roomName,
                #Eсли игрок в комнате, вернуть имя.
                "player1": cls.rooms[k].player1.name if cls.rooms[k].player1 is not None else None,
                "player2": cls.rooms[k].player2.name if cls.rooms[k].player2 is not None else None
            }
            mes.append(roomData)
        return  mes


    @classmethod
    def getRoomById(cls, id):
        return cls.rooms.get(id, None)