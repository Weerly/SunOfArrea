import logging

import tornado.httpserver
import tornado.ioloop
import tornado.web
from tornado.options import define, options

from app.gameApp import SoAGameServer

define("port", default=8000, help="run on the given port", type=int)

message = """------------SOA gameServer--------------
port:{0}
"""

if __name__ == "__main__":
    #Set log level
    logging.basicConfig(level=logging.WARNING)

    #Tornado config
    soaApp = SoAGameServer()
    http_server = tornado.httpserver.HTTPServer(soaApp)
    http_server.listen(options.port)
    print message.format(options.port)
    tornado.ioloop.IOLoop.instance().start()

