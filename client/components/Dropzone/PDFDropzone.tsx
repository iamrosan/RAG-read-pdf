"use client"; // if you're using App Router

import { useState } from "react";

export default function PDFDropzone() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setPdfFile(file);
      } else {
        setError("Only PDF files are allowed!");
        setPdfFile(null);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-8 gap-6">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-96 h-48 border-2 border-dashed border-gray-400 flex items-center justify-center"
      >
        {pdfFile ? (
          <span className="text-green-600">{pdfFile.name}</span>
        ) : (
          <span className="text-gray-500">Drag & drop a PDF file here</span>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
