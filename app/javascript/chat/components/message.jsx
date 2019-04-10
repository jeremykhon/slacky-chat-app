import React from 'react';

const Message = ({ message }) => {
  const time = new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

  return (
    <div className="message-container">
      <div className="message-content">{message.content}</div>
      <div className="message-timestamp">{time}</div>
    </div>
  );
};

export default Message;
