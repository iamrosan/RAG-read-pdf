"use client";

import { useState } from "react";
import PDFDropzone from "./PDFDropzone";
import PDFPreview from "./PDFPreview";

const Dropzone = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col items-center p-12 gap-8">
      <PDFDropzone onFileSelect={(file) => setPdfFile(file)} />

      {pdfFile && <PDFPreview file={pdfFile} />}
    </div>
  );
};

export default Dropzone;
