"use client";

import { useRef, useState } from "react";

export default function PDFDropzone() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError(null);

    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setError("Only PDF files are allowed!");
      setPdfFile(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-8 gap-6">
      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className="w-96 h-48 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
      >
        {pdfFile ? (
          <span className="text-green-600">{pdfFile.name}</span>
        ) : (
          <span className="text-gray-500">
            Click or Drag & drop a PDF file here
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
