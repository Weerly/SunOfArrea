import tornado.websocket

#TODO: try catch block
class WebSocketGameHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        self.write_message("Message from server: connection open")

    def on_message(self, message):
        self.write_message("Server says: "+message)

    def on_close(self):
        self.write("SERVER: closing connection")