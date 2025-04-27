from flask import Flask
from app.routes.upload import upload_bp

def create_app():
    """
    Create and configure the Flask application.
    """
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Register the upload blueprint
    app.register_blueprint(upload_bp, url_prefix='/api/v1')

    return app