#!/usr/bin/env python
import os
from app import create_app, DB
import sys
from config import Config


if __name__ == '__main__':
    if len(sys.argv) == 1:
        app = create_app(os.getenv('FLASK_CONFIG') or 'default')
        # print(app.url_map)
        app.run()
    else:
        if sys.argv[1] == 'setup':
            db = DB(Config.DATABASE_URI)
            db.create_tables()
