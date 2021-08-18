import React, {useState} from 'react';

// eslint-disable-next-line react/prop-types
const ChatBottom = ({onClickChatBottom}) => {
  const [msg, setMsg] = useState(``);

  const handleSetMsg = ({target}) => {
    setMsg(target.value);
  };

  const handleButtonClick = () => {
    setMsg(``);
    onClickChatBottom(msg);
  };

  return (
    <div className="chat__bottom">
      <textarea
        value={msg}
        onChange={handleSetMsg}
        placeholder="Enter your message" />
      <button className="chat__bottom-btn" onClick={handleButtonClick}>Send</button>
    </div>
  );
};

export default ChatBottom;
