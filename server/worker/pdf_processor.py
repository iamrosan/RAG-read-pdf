import fitz # PyMuPDF

def process_pdf(file_path):
    print(f"Processing PDF file: {file_path}")

    # Open the PDF file
    pdf_document = fitz.open(file_path)
    chunks = []
    # Iterate through each page in the PDF
    for page in pdf_document:
        text = page.get_text()
        chunks.append(text)

        # For now just printing. Later you will vectorize and store to QuadrantDB
    for idx, chunk in enumerate(chunks):
        print(f"Chunk {idx}: {chunk[:100]}...")  # First 100 characters

    print("PDF processing complete 🚀")


    
       