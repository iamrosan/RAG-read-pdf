import os

class Config:
    """
    Base configuration class.
    """
    UPLOAD_FOLDER = os.path.join('app','static','uploads')
    ALLOWED_EXTENSIONS = {'pdf'}