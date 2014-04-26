import unittest

import websocket

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

    def testOn1ServerSendsCard(self):
        print "Sending 1"
        self.ws.send('{"type":1}')
        self.ws.recv()
        res = self.ws.recv()
        print res
        self.assertIn("Stormtrooper", res)

    def testOn2ServerSendsRooms(self):
        print "Sending 2"
        self.ws.send('{"type":2}')
        self.ws.recv()
        res = self.ws.recv()
        print res
        self.assertIn("listOfRooms", res)

    def tearDown(self):
        self.ws.close()

if __name__ == "__main__":
    unittest.main()