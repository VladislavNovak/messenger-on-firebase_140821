import React, {useRef} from 'react';

// eslint-disable-next-line react/prop-types
const ChatBottom = ({onClickChatBottom}) => {
  const aTextarea = useRef(null);

  const handleButtonClick = () => {
    onClickChatBottom(aTextarea.current.value);
    aTextarea.current.value = ``;
  };

  return (
    <div className="chat__bottom">
      <textarea ref={aTextarea} placeholder="Enter your message" />
      <button className="chat__bottom-btn" onClick={handleButtonClick}>Send</button>
    </div>
  );
};

export default ChatBottom;
