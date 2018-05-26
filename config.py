import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or '280e0572-a057-4e78-afd2-3b5feb93363m'
    SSL_DISABLE = True
    DEBUG = True
    DATABASE_HOST = os.getenv('DATABASE_HOST', 'localhost')
    DATABASE_NAME = os.getenv('DATABASE_NAME', 'selectel_tickets')
    DATABASE_USER = os.getenv('DATABASE_USER', 'selectel')
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD', 'selectel')
    DATABASE_PORT = os.getenv('DATABASE_PORT', '5432')
    DATABASE_URI = os.environ.get(
        'DATABASE_URL') or "postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}".format(
        db_user=DATABASE_USER,
        db_pass=DATABASE_PASSWORD,
        db_host=DATABASE_HOST,
        db_port=DATABASE_PORT,
        db_name=DATABASE_NAME
    )
    SERVER_NAME = '127.0.0.1:5000'

    @staticmethod
    def init_app(app):
        pass


class ProductionConfig(Config):
    DEBUG = False

    @classmethod
    def init_app(cls, app):
        Config.init_app(app)


config = {
    'production': ProductionConfig,
    'default': Config
}
