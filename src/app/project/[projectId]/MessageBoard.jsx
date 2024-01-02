"use client";

import React, { useState, useEffect } from "react";
import getUserColor from "../../_utils/getUserColor.js";
import { IoMdSend } from "react-icons/io";
import supabase from "./supabase.js";

export default function MessageBoard({
  messages,
  project_meta,
  handleUpdateMessages,
}) {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { team } = project_meta;

  const handleSendMessage = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setUserMessage("");
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("username")
      .eq("email", supabase.auth.user().email);

    if (userError) {
      console.log(userError);
      return;
    }

    const { error } = await supabase.from("messages").insert([
      {
        project_id: project_meta.project_id,
        posted_by: userData[0].username,
        text: userMessage,
      },
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    const channel = supabase.channel(project_meta.project_id).on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        console.log("Change received!", payload);
        handleUpdateMessages(payload.new);
      }
    );

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="message-board-main">
      <div className="message-board-title">
        <h2>Team Chat</h2>
      </div>
      <div className="message-board-messages">
        {messages.length > 0 && (
          <>
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
          </>
        )}
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
          {isLoading ? <span className="loader" /> : <IoMdSend />}
        </button>
      </form>
    </div>
  );
}
