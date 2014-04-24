# -*- coding: utf-8 -*-
class Player(object):
    """
    Класс описывает модель игрока, и его взаимодействие с клиентом через connection
    """
    def __init__(self, connection):
        """
        connection <WebSocketHandler> физическое соедениние с клиентом
        """
        self.connection = connection


class Room(object):
    """
    Игровая комната "внутри" которой осущетсвляется игра.
    """
    def __init__(self, player1):
        """
        Комнату должен создать один из игроков.
        player1 <Player> игрок создавший комнату
        """
        self.player1 = player1
        self.player2 = None