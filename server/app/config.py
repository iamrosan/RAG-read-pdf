import os

class Config:
    """
    Base configuration class.
    """
    UPLOAD_FOLDER = os.path.join('app','static','uploads')
    ALLOWED_EXTENSIONS = {'pdf'}
    REDIS_URL = 'redis://:password@20.198.56.102:6379/0'