"use client";

import { useRef } from "react";

interface PDFDropzoneProps {
  onFileSelect: (file: File) => void;
}

export default function PDFDropzone({ onFileSelect }: PDFDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateAndSend(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSend(file);
    }
  };

  const validateAndSend = (file: File) => {
    if (file.type === "application/pdf") {
      onFileSelect(file);
    } else {
      alert("Only PDF files are allowed!");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-8 gap-6">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className="w-96 h-48 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
      >
        <span className="text-gray-500">
          Click or Drag & drop a PDF file here
        </span>
      </div>

      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
