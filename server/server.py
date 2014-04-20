import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from app.gameApp import SoAGameServer

if __name__ == "__main__":
    soaApp = SoAGameServer()
    http_server = tornado.httpserver.HTTPServer(soaApp)
    http_server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()