from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from app.config import Config

# Initialize the Flask Blueprint
upload_bp = Blueprint('upload', __name__)

def allowed_file(filename):
    """
    Check if the file has an allowed extension.
    """
    ALLOWED_EXTENSIONS = {'pdf'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('upload-pdf', methods=['POST'])
def upload_pdf():
    """
    Handle PDF file upload.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No PDF Found'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        upload_path = os.path.join(Config.UPLOAD_FOLDER, filename)
        os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
        file.save(upload_path)
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200

    return jsonify({'error': 'Invalid File Type : Allowed file type ~ pdf'}), 400