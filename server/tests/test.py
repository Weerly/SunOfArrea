import unittest
import json
import sys
import os.path

import websocket

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
from app.constants import MessageType

class TestServer(unittest.TestCase):
    """
    This is not a unit test.
    Simple client to test basic functionality of the server
    """
    def setUp(self):
        self.ws = websocket.create_connection("ws://127.0.0.1:8000/ws")

    def testOnOpenServerSendsCard(self):
        res = self.ws.recv()
        print "Card on connection \n", res
        self.assertIn("cardReceived", res)
        print "----"

    def testServerSendsCard(self):
        print "Sending {0} ServerSendsCard".format(MessageType.GetCard)
        self.ws.send(json.dumps({'type':MessageType.GetCard}))
        self.ws.recv()
        res = self.ws.recv()
        print res
        self.assertIn("Stormtrooper", res)

    def testServerSendsListRooms(self):
        print "Sending {0} ListOfRooms".format(MessageType.GetListOfRoom)
        self.ws.send(json.dumps({'type':MessageType.GetListOfRoom}))
        self.ws.recv()
        res = self.ws.recv()
        print res
        self.assertIn("listOfRooms", res)

    def testServerCreatesAndSendsRoom(self):
        print "Sending {0} ConnectToServer".format(MessageType.ConnectToRoom)
        self.ws.send(json.dumps({'type':MessageType.ConnectToRoom}))
        self.ws.recv()
        res = self.ws.recv()
        print res
        self.assertIn("listOfRooms", res)

    def tearDown(self):
        self.ws.close()

if __name__ == "__main__":
    unittest.main()