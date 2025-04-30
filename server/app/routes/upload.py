from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from app.config import Config
import redis
from rq import Queue
from worker.pdf_processor import process_pdf
import logging
import time

# Initialize the Flask Blueprint
upload_bp = Blueprint('upload', __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Redis
conn = redis.from_url(Config.REDIS_URL)
q = Queue(connection=conn)

def allowed_file(filename):
    """
    Check if the file has an allowed extension.
    """
    ALLOWED_EXTENSIONS = {'pdf'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    """Generate a unique filename using timestamp to prevent collisions."""
    ext = filename.rsplit('.', 1)[1].lower()
    timestamp = int(time.time() * 1000)  # current time in milliseconds
    return f"{timestamp}.{ext}"

@upload_bp.route('upload-pdf', methods=['POST'])
def upload_pdf():
    """
    Handle PDF file upload.
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No PDF Found'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # Generate secure unique filename
            unique_filename = get_unique_filename(filename)
            upload_path = os.path.join(Config.UPLOAD_FOLDER, unique_filename)
            
            # Ensure upload directory exists
            os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)

            # Save the file
            file.save(upload_path)
            logger.info(f"File saved to {upload_path}")

            #add the file processing task to the queue
            job = q.enqueue(
                 process_pdf, 
                 upload_path,
                 job_timeout=current_app.config['TASK_TIMEOUT'],  # e.g., '5m'
                 result_ttl=current_app.config['RESULT_TTL']
                 )
            
            logger.info(f"Job {job.id} enqueued for {upload_path}")

            print(f"Job {job.get_id()} added to queue for processing. \n status: ${job.get_status()}")
            return jsonify({'message': 'File uploaded successfully', 'filename': filename, "job_id": job.get_id()}), 202

        return jsonify({'error': 'Invalid File Type : Allowed file type ~ pdf'}), 400
    
    except Exception as e:
            logger.error(f"Upload failed: {str(e)}")
            return jsonify({'error': 'Internal server error'}), 500