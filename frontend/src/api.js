import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask Backend URL

// Upload PDF
export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,  // ✅ Ensure CORS cookies are handled
    });
    return response.data;
  } catch (error) {
    console.error("Upload Error:", error);
    return { error: error.response?.data?.error || "Failed to upload PDF" };
  }
};

// Ask Question
export const askQuestion = async (question) => {
  try {
    const response = await axios.post(`${API_URL}/ask`, { question }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,  // ✅ Ensure CORS cookies are handled
    });
    return response.data;
  } catch (error) {
    console.error("Ask Error:", error);
    return { error: error.response?.data?.error || "Failed to fetch answer" };
  }
};
