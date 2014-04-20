import json
import logging
import sys

import tornado.websocket


class WebSocketGameHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        try:
            self.write_message("Message from server: connection open")
            self.write_message(json.dumps({"type":"cardReceived","card":{"name":"elf","health":2, "attack":1}}))
        except:
            logging.error(" - wsOpen "+str(sys.exc_info()[0]))


    def on_message(self, message):
        self.write_message("Server says: "+message)
        if int(message) == 1:
            self.write_message(json.dumps({"type":"cardReceived","card":
                                                                    {"name":"Stormtrooper","health":52, "attack":72}}))

    def on_close(self):
        pass