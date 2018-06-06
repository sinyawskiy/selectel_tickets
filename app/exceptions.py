class ModelNotFound(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message


class ValidationError(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message
