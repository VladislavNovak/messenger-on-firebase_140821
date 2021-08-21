/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import dayjs from 'dayjs';

import {Icon} from '../../assets/img';

// ---------------------------------------------------------------------------------------------------------

const Msg = ({user, uid, text, createdAt}) => {
  // eslint-disable-next-line no-unused-vars
  const [editableText, setEditableText] = useState(text);
  // eslint-disable-next-line no-unused-vars
  const [editStatus, setEditStatus] = useState(false);

  const handlePopupActivate = (msg) => {
    // eslint-disable-next-line no-console
    console.log(`Вошел!: `, msg);
  };

  const handleInputChange = ({target}) => {
    setEditableText(target.value);
  };

  const handleButtonEdit = () => {
    setEditStatus(true);
  };

  return (
    <div
      onMouseEnter={() => handlePopupActivate(text)}
      className={`msg ${uid === user.uid ? `msg-send` : `msg-received`}`}>
      <div className="msg__content">
        <p className="msg__content-hour">{createdAt && dayjs(createdAt.toDate()).format(`HH:mm`)}</p>
        <div className="msg__control">
          <button className="msg__control-btn">
            <img
              onClick={handleButtonEdit}
              className="msg__control-img"
              src={Icon.EDIT}
              alt="edit button" />
          </button>
          <button className="msg__control-btn">
            <img className="msg__control-img" src={Icon.DELETE} alt="" />
          </button>
        </div>
        <p
          onChange={handleInputChange}
          contentEditable={editStatus}
          suppressContentEditableWarning={editStatus}
          className={`msg__text ${editStatus && `msg__text--edit`}`}>{editableText}</p>
      </div>
    </div>
  );
};

export default Msg;
