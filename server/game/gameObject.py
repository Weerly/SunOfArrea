from game.constants import GameConstants


class Game(object):
    def __init__(self):
        self.player1_game_field = [None for _ in range(GameConstants.field_size)]
        self.player2_game_field = [None for _ in range(GameConstants.field_size)]

    def clear_all_game_fields(self):
        self.player1_game_field = []
        self.player2_game_field = []