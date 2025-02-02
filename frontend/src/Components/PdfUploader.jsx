import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadPDF } from "../api";

const PdfUploader = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] }, // Ensure only PDFs are accepted
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);
      setMessage("Uploading PDF...");
      setError("");

      try {
        const response = await uploadPDF(acceptedFiles[0]); // Call API
        setUploading(false);

        if (response.error) {
          setError(response.error);
        } else {
          setMessage("PDF uploaded successfully!");
          onUploadComplete(response.pdf_id);
        }
      } catch (err) {
        setUploading(false);
        setError("Failed to upload PDF. Please try again.");
      }
    },
  });

  return (
    <div className="container mt-4">
      <div {...getRootProps()} className="border p-4 text-center bg-light rounded" style={{ cursor: "pointer" }}>
        <input {...getInputProps()} />
        <p className="text-muted">Drag & drop a PDF here, or click to select a file.</p>
      </div>
      {uploading && <p className="text-primary mt-2">Uploading...</p>}
      {message && <p className="text-success mt-2">{message}</p>}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default PdfUploader;
