import unittest

from game.gameObject import Game
from game.card import CreatureCard
from game.constants import GameConstants

class TestGame(unittest.TestCase):
    def setUp(self):
        self.game = Game()

    def test_field_size_according_to_setting(self):
        self.assertEqual(len(self.game.player1_game_field), GameConstants.field_size)

    def test_creature_in_the_field(self):
        c = CreatureCard(2,3)
        self.game.player1_game_field.append(c)
        self.assertIn(c,self.game.player1_game_field)


    def test_game_clear_all_fields(self):
        c1 = CreatureCard(10,10)
        c2 = CreatureCard(5,5)
        self.game.player1_game_field.append(c1)
        self.game.player2_game_field.append(c2)
        self.game.clear_all_game_fields()
        self.assertEqual(self.game.player1_game_field, [])
        self.assertEqual(self.game.player2_game_field, [])

if __name__ == '__main__':
    unittest.main()