from flask import Blueprint

api = Blueprint('api', __name__)

from . import tickets
from . import comments