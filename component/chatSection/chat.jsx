'use client'
import axios from "axios";
import { useState } from "react";

export default function ChatSession() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const RagCall = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message
    };

    // add user message
    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    try {

      const res = await axios.post(
        "/api/fetchData",
        { Query: userMessage.text },
        { withCredentials: true }
      );

      const aiMessage = {
        role: "ai",
        text: res?.data?.result?.answer || "No response"
      };

      // add AI response
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong" }
      ]);

    }
  };

  return (
    <div className=" h-screen max-w-3xl mx-auto py-10 px-6 bg-white -translate-y-[30%] flex flex-col gap-8">

      {/* Title */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm tracking-widest text-gray-500 font-semibold">
          CHAT SESSION
        </span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col gap-6">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >

            {msg.role === "ai" && (
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white">
                ✦
              </div>
            )}

            <div
              className={`px-5 py-3 rounded-2xl max-w-[70%] text-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.text}
            </div>

            {msg.role === "user" && (
              <img
                src="https://i.pravatar.cc/40"
                className="w-9 h-9 rounded-full"
              />
            )}

          </div>

        ))}

      </div>

      {/* Input */}
      <form 
        onSubmit={RagCall}
        className="flex items-center gap-3 border rounded-xl p-2 mt-6 shadow-sm"
      >

        <input
          type="text"
          placeholder="Ask anything about the repository..."
          className="flex-1 outline-none px-3 py-2  text-sm text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Send
        </button>

      </form>

    </div>
  );
}