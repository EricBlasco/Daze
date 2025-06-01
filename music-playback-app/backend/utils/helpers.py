def validate_file_extension(filename, allowed_extensions):
    """Validate if the file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def sanitize_filename(filename):
    """Sanitize the filename to prevent directory traversal attacks."""
    return filename.replace('../', '').replace('..\\', '').strip()

def generate_response(message, status_code=200):
    """Generate a standardized response format."""
    return {
        "message": message,
        "status_code": status_code
    }