import React from 'react';

function strToRGB(str){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

const Message = ({ message }) => {
  const time = new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  const color = strToRGB(message.nickname);

  return (
    <div className="message-container">
      <div className="message-author-timestamp-container">
        <div style={{ color }} className="message-author">{message.nickname}</div>
        <div className="message-timestamp">{time}</div>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
};

export default Message;
