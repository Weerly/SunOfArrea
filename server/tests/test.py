import unittest
import json
import sys
import os.path

import websocket

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
from app.constants import Message

class TestServer(unittest.TestCase):
    """
    This is not a unit test.
    Simple client to test basic functionality of the server
    """
    def setUp(self):
        self.ws = websocket.create_connection("ws://127.0.0.1:8000/ws")

    def testOnOpenServerSendsCard(self):
        res = self.ws.recv()
        print "\nCard on connection", res
        self.assertIn("cardReceived", res)

    def testServerSendsCard(self):
        print "\nSending {0} ServerSendsCard".format(Message.GetCard)
        self.ws.send(json.dumps({'type':Message.GetCard}))
        self.ws.recv()
        res = self.ws.recv()
        print res
        self.assertIn("Stormtrooper", res)

    def testServerSendsListRooms(self):
        print "\nSending {0} ListOfRooms".format(Message.GetListOfRoom)
        self.ws.send(json.dumps({'type':Message.GetListOfRoom}))
        self.ws.recv()
        res = self.ws.recv()
        print res
        self.assertIn("listOfRooms", res)

    def testServerCreatesAndSendsRoom(self):
        print "\nSending {0} CreateRoom".format(Message.CreateRoom)
        self.ws.send(json.dumps({'type':Message.CreateRoom, 'name':'My Favorite Room'}))
        self.ws.recv()
        res = self.ws.recv()
        print res
        self.assertIn("id", res)

    def testErrorWhenUserCreatesSecondRoom(self):
        print "\nSending {0} Create 2 room. Room 1".format(Message.CreateRoom)
        self.ws.send(json.dumps({'type':Message.CreateRoom, 'name':'First room, Ok'}))
        self.ws.recv()
        res = self.ws.recv()
        print res
        print "create second Room"
        self.ws.send(json.dumps({'type':Message.CreateRoom, 'name':'SecondRoom room, WRONG'}))
        res2 = self.ws.recv()
        print res2
        self.assertIn(str(Message.Error), res2)

    def tearDown(self):
        self.ws.close()

if __name__ == "__main__":
    unittest.main()