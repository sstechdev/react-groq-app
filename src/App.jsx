import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post('http://localhost:5000/api/chat', { message });
      setChatHistory([...chatHistory, { sender: 'user', message }, { sender: 'bot', message: result.data }]);
      setMessage('');
    } catch (error) {
      console.error("Error fetching data", error);
      setChatHistory([...chatHistory, { sender: 'user', message }, { sender: 'bot', message: 'Error fetching data' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Groq API Chat</h1>
        <div className="flex flex-col space-y-4 mb-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                chat.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
              }`}
            >
              {chat.message}
            </div>
          ))}
          {loading && <p className="self-center">Loading...</p>}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
            placeholder="Enter your message"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
