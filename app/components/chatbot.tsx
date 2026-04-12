"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botMessage = { role: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
    }

    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">

      {/* Chat Window */}
      {open && (
        <div className="w-[340px] h-[450px] bg-black border border-cyan-500 rounded-xl flex flex-col overflow-hidden text-white">

          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-cyan-500 bg-gradient-to-r from-black to-gray-900">
            <div className="flex items-center gap-2">

              {/* Header Avatar */}
              <div className="p-[2px] rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.8)]">
                <div className="w-7 h-7 relative rounded-full overflow-hidden bg-black">
                  <Image
                    src="/images/home/chatbot-icon.png"
                    alt="Bot"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="font-semibold text-cyan-400">
                99 Visual AI Assistant
              </h3>
            </div>

            <div className="flex gap-2">
              <button onClick={clearChat} className="text-xs text-yellow-400 hover:text-yellow-300">
                Clear
              </button>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">

            {messages.map((msg, index) => (
              <div key={index}>

                {/* BOT MESSAGE */}
                {msg.role === "bot" && (
                  <div className="flex items-start gap-2">

                    {/* LEFT Avatar */}
                    <div className="flex-shrink-0 p-[2px] rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,255,255,0.8)]">
                      <div className="w-7 h-7 relative rounded-full overflow-hidden bg-black">
                        <Image
                          src="/images/home/chatbot-icon.png"
                          alt="Bot"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-gray-800 border border-cyan-500 px-3 py-2 rounded-lg max-w-[75%]">
                      {msg.text}
                    </div>
                  </div>
                )}

                {/* USER MESSAGE */}
                {msg.role === "user" && (
                  <div className="flex justify-end">
                    <div className="bg-cyan-500 text-black px-3 py-2 rounded-lg max-w-[75%]">
                      {msg.text}
                    </div>
                  </div>
                )}

              </div>
            ))}

          </div>

          {/* Input */}
          <div className="p-3 border-t border-cyan-500 flex gap-2 bg-black">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask the AI..."
              className="flex-1 px-3 py-2 rounded-md bg-gray-900 border border-cyan-500 text-white outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-cyan-500 text-black px-4 rounded-md hover:bg-cyan-400 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-black flex items-center justify-center hover:scale-105 transition overflow-hidden"
      >
        <div className="p-[3px] rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.9)]">
          <div className="w-12 h-12 rounded-full overflow-hidden relative bg-black">
            <Image
              src="/images/home/chatbot-icon.png"
              alt="Chatbot"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </button>

    </div>
  );
}