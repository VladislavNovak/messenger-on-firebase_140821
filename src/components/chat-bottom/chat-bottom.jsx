import React, {useRef} from 'react';

import {Icon} from '../../assets/img';

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
      <button className="chat__bottom-btn" onClick={handleButtonClick}>
        <img className="chat__bottom-img" src={Icon.SEND} alt="" />
      </button>
    </div>
  );
};

export default ChatBottom;
