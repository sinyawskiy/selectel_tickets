from flask import Flask, g
from app.models import DB
from config import config


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    from .api_1_0 import api as api_1_0_blueprint
    app.register_blueprint(api_1_0_blueprint, url_prefix='/api/v1.0')

    @app.before_request
    def before_request():
        g.db = DB(app.config['DATABASE_URI'])

    @app.teardown_request
    def teardown_request(exception):
        g.db.close()

    return app
