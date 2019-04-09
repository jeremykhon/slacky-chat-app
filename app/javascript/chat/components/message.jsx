import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="message">
      <div>{message.author}</div>
      <div>{message.content}</div>
    </div>
  );
};

export default Message;
