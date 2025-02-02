import { useState } from "react";
import PdfUploader from "./PdfUploader";
import ChatBox from "./Chatbox";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const AppPage = () => {
  const navigate = useNavigate();
  const [pdfId, setPdfId] = useState(null); // Store PDF ID

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary p-3">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">📄 PDFBot</a>
          <DarkModeToggle />
          <button className="btn btn-light" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-sm p-4">
              <h3 className="text-center">Upload Your PDF</h3>
              <PdfUploader onUploadComplete={setPdfId} />
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="card shadow-sm p-4">
              <h3 className="text-center">Chat with PDFBot</h3>
              <ChatBox pdfId={pdfId} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-5">
        <p className="mb-0">© 2025 PDFBot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppPage;
