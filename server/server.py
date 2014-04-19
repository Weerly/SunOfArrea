import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

import 

if __name__ == "__main__":
    app = tornado.web.Application(
        handlers=[
            (r"/", IndexHandler),
        ]
    )

    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()