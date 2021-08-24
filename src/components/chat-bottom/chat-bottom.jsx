import React, {useRef} from 'react';

import {Icon} from '../../assets/img';

// eslint-disable-next-line react/prop-types
const ChatBottom = ({onClickChatBottom}) => {
  const refTextarea = useRef(null);

  const handleButtonClick = () => {
    onClickChatBottom(refTextarea.current.value);
    refTextarea.current.value = ``;
  };

  return (
    <div className="chat__bottom">
      <textarea ref={refTextarea} placeholder="Enter your message" />
      <button className="chat__bottom-btn" onClick={handleButtonClick}>
        <img className="chat__bottom-img" src={Icon.SEND} alt="" />
      </button>
    </div>
  );
};

export default ChatBottom;
