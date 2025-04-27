"use client";

interface PDFPreviewProps {
  file: File;
}

export default function PDFPreview({ file }: PDFPreviewProps) {
  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="flex flex-col items-center p-8 gap-4">
      <h2 className="text-xl font-semibold">PDF Preview</h2>
      <iframe
        src={fileUrl}
        title="PDF Preview"
        className="w-150 h-120 border"
      ></iframe>
    </div>
  );
}
