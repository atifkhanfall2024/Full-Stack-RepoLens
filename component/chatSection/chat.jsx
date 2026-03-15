'use client'
import axios from "axios";
import { useState } from "react";

export default function ChatSession() {

  const [message, setMessage] = useState("");
  const [ai  , setai] = useState("")
  

   const RagCall = async(e)=>{
                          e.preventDefault()
                          try {
                            const res = await axios.post('/api/fetchData' , {Query:message} , {withCredentials:true})
                             console.log(res?.data);
                             setai(res?.data?.result?.answer)
                          } catch (error) {
                            
                          }

   }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white -translate-y-[40%] flex flex-col gap-8">

      {/* Title */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm tracking-widest text-gray-500 font-semibold">
          CHAT SESSION
        </span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-8">

        {/* User Message */}
        <div className="flex gap-4">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-800">Alex</span>
              <span className="text-sm text-gray-400">10:42 AM</span>
            </div>

            <div className="bg-gray-100 rounded-2xl px-5 py-4 text-gray-700 max-w-xl">
             {message}
            </div>
          </div>
        </div>

        {/* AI Message */}
        <div className="flex gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
            ✦
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-800">RepoMind</span>
              <span className="text-sm text-gray-400">10:43 AM</span>
            </div>

            <div className="bg-gray-100 rounded-2xl px-5 py-4 text-gray-700 max-w-xl">
             {ai}
            </div>
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className="flex items-center gap-3 border rounded-xl p-2 mt-6 shadow-sm">

        <input
          type="text"
          placeholder="Ask anything about the repository..."
          className="flex-1 outline-none px-3 py-2 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition" onClick={RagCall}
        >
          Send
        </button>

      </div>

    </div>
  );
}