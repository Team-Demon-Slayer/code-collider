"use client";

import React, { useState, useEffect, useRef } from "react";
import getUserColor from "../../_utils/getUserColor.js";
import { IoMdSend } from "react-icons/io";
// import supabase from "../../api/_db/index.js";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function MessageBoard({
  messages,
  project_meta,
  handleUpdateMessages,
}) {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messageEndRef = useRef(null);

  const supabase = createClientComponentClient();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const users = project_meta.users;

  const handleSendMessage = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setUserMessage("");
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log(user);
      return;
    }
    console.log("get user", user);

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("username")
      .eq("email", user.email);

    const { error } = await supabase.from("messages").insert({
      id: uuidv4(),
      project_id: project_meta.id,
      posted_by: userData[0].username,
      text: userMessage,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const channel = supabase
      .channel(project_meta.project_id)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          handleUpdateMessages(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    messages &&
    project_meta && (
      <div className="message-board-main">
        <div className="message-board-title">
          <h2>Team Chat</h2>
        </div>
        <div className="message-board-messages">
          {messages.length < 1 ? (
            <div className="no-messages">No messages yet...</div>
          ) : (
            <>
              {messages.map((message, index) => {
                const userIndex = users.findIndex(
                  (user) => user.username === message.posted_by
                );
                const userTheme = getUserColor(userIndex);
                return (
                  <div key={message.id} className="message-bubble">
                    <div className={`message-user ${userTheme}`}>
                      @{message.posted_by}
                    </div>
                    <div className="message-text">{message.text}</div>
                  </div>
                );
              })}
            </>
          )}
          <div ref={messageEndRef} />
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
          <button
            type="submit"
            disabled={isLoading}
            className="message-send-btn"
          >
            {isLoading ? <span className="loader" /> : <IoMdSend />}
          </button>
        </form>
      </div>
    )
  );
}
