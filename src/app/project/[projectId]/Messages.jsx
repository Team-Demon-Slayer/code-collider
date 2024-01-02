import getUserColor from "../../_utils/getUserColor.js";

export default async function Messages({ messages, team }) {
  return (
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
  );
}
