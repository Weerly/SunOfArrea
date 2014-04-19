import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from handlers.IndexHandler import IndexHandler
from handlers.WebSocketGameHandler import WebSocketGameHandler

if __name__ == "__main__":
    app = tornado.web.Application(
        handlers=[
            (r"/", IndexHandler),
            (r"/ws", WebSocketGameHandler),
        ],
        template_path = os.path.join(os.path.dirname(__file__), "webApp", "templates"),
        static_path = os.path.join(os.path.dirname(__file__), "webApp", "static"),
        debug=True
    )


    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()