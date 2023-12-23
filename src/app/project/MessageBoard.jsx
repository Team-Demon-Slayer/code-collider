"use client";

import React, { useState } from "react";
import getUserColor from "../_utils/getUserColor.js";
import { IoMdSend } from "react-icons/io";

export default function MessageBoard({ messages, project_meta }) {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { team } = project_meta;

  const handleSendMessage = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(userMessage);
    setUserMessage("");
    setIsLoading(false);
  };
  return (
    <div className="message-board-main">
      <div className="message-board-title">
        <h2>Team Chat</h2>
      </div>
      <div className="message-board-messages">
        {messages.map((message) => {
          const userIndex = team.indexOf(message.posted_by);
          const userTheme = getUserColor(userIndex);
          return (
            <div key={message.message_id} className="message-bubble">
              <div className={`message-user ${userTheme}`}>
                @{message.posted_by}
              </div>
              <div className="message-text">{message.text}</div>
            </div>
          );
        })}
      </div>
      <form className="message-input-field" onSubmit={handleSendMessage}>
        <textarea
          type="text"
          placeholder="Send message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(e);
            }
          }}
          className="send-message-input"
        />
        <button type="submit" disabled={isLoading} className="message-send-btn">
          {!isLoading ? <span className="loader" /> : <IoMdSend />}
        </button>
      </form>
    </div>
  );
}
