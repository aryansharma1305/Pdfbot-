import { useState } from "react";
import { askQuestion } from "../api";

const ChatBox = ({ pdfId }) => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleAsk = async () => {
    if (!question.trim()) return; // Prevent empty input
    if (!pdfId) {
      alert("Please upload a PDF first!");
      return;
    }

    const userMessage = { role: "user", content: question };
    setChatHistory((prevChat) => [...prevChat, userMessage]);
    setQuestion(""); // Clear input immediately for better UX

    try {
      const response = await askQuestion(question, pdfId); // Call API with PDF ID
      const botMessage = {
        role: "bot",
        content: response.answer || "Error fetching response",
      };

      setChatHistory((prevChat) => [...prevChat, botMessage]); // Append bot response
    } catch (error) {
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: "bot", content: "⚠️ Failed to fetch response. Try again!" },
      ]);
    }
  };

  return (
    <div className="container mt-4">
      {/* Chat History Box */}
      <div className="border rounded p-3 bg-light" style={{ height: "300px", overflowY: "auto" }}>
        {chatHistory.map((msg, idx) => (
          <p key={idx} className={`p-2 ${msg.role === "user" ? "text-end text-primary" : "text-start text-dark"}`}>
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.content}
          </p>
        ))}
      </div>

      {/* Chat Input */}
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder={pdfId ? "Ask a question..." : "Upload a PDF first"}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          disabled={!pdfId} // Disable if no PDF uploaded
        />
        <button className="btn btn-primary" onClick={handleAsk} disabled={!pdfId}>
          Ask
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
