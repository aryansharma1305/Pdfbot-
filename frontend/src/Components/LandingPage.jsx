import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">📄 PDFBot</a>
          <DarkModeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center text-white hero-section d-flex align-items-center">
        <motion.div className="container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="fw-bold display-4">Chat with Your PDFs Instantly</h1>
          <p className="lead">Upload a PDF and get AI-powered answers in seconds.</p>
          <motion.button onClick={() => navigate("/app")} className="btn btn-light btn-lg fw-bold mt-3"
            whileHover={{ scale: 1.1 }}>
            Try PDFBot Now
          </motion.button>
        </motion.div>
      </header>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2025 PDFBot. All rights reserved.</p>
      </footer>

      {/* Inline CSS */}
      <style>
        {`
          .hero-section {
            background: linear-gradient(135deg, #007bff, #0056b3);
            padding: 100px 0;
            min-height: 60vh;
          }

          body.dark-mode {
            background-color: #121212;
            color: white;
          }

          body.dark-mode .navbar, body.dark-mode .bg-dark {
            background-color: #1f1f1f !important;
          }

          body.dark-mode .card {
            background-color: #222;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
