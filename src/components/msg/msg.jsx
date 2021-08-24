/* eslint-disable react/prop-types */
import React, {useState, useRef, useEffect} from 'react';

import dayjs from 'dayjs';

import {Icon} from '../../assets/img';

// ---------------------------------------------------------------------------------------------------------

const Msg = ({user, uid, text, createdAt, onClickSave}) => {
  // eslint-disable-next-line no-unused-vars
  const [isEditable, setEditable] = useState(false);
  const refTextarea = useRef(null);

  useEffect(() => {
    refTextarea.current.style.height = `0px`;

    const scrollHeight = refTextarea.current.scrollHeight;
    refTextarea.current.style.height = scrollHeight + `px`;

  }, [refTextarea.current]);

  const handleAction = ({currentTarget: {name}}) => {
    switch (name) {
      case `edit`:
        // eslint-disable-next-line no-console
        console.log(`FIRE: `, name);
        setEditable(true);
        break;
      case `delete`:
        // eslint-disable-next-line no-console
        console.log(`FIRE: `, name);
        // setEditable(true);
        break;
      case `save`:
        // eslint-disable-next-line no-console
        console.log(`FIRE: `, name);
        onClickSave(refTextarea.current.value);
        setEditable(false);
        break;
      case `cancel`:
        // eslint-disable-next-line no-console
        console.log(`FIRE: `, name);
        refTextarea.current.value = text;
        setEditable(false);
        break;

      default:
        break;
    }
  };

  const insertBtnsEditDelete = () => (
    <>
      <button onClick={handleAction} name="edit" className="msg__control-btn">
        <img
          className="msg__control-img"
          src={Icon.EDIT}
          alt="edit text button" />
      </button>
      <button onClick={handleAction} name="delete" className="msg__control-btn">
        <img
          className="msg__control-img"
          src={Icon.DELETE}
          alt="delete message button" />
      </button>
    </>
  );

  const insertBtnsSaveCancel = () => (
    <>
      <button onClick={handleAction} name="save" className="msg__control-btn">
        <img
          className="msg__control-img"
          src={Icon.SAVE}
          alt="edit text button" />
      </button>
      <button onClick={handleAction} name="cancel" className="msg__control-btn">
        <img
          className="msg__control-img"
          src={Icon.CANCEL}
          alt="delete message button" />
      </button>
    </>
  );

  return (
    <div
      className={`msg ${uid === user.uid ? `msg-send` : `msg-received`}`}>
      <div className="msg__content">
        <p className="msg__content-hour">{createdAt && dayjs(createdAt.toDate()).format(`HH:mm`)}</p>
        <div className="msg__control">
          {!isEditable ? insertBtnsEditDelete() : insertBtnsSaveCancel()}
        </div>

        <textarea
          className={isEditable ? `msg__textarea msg__textarea--editable` : `msg__textarea`}
          ref={refTextarea}
          defaultValue={text}
          readOnly={!isEditable} />
      </div>
    </div>
  );
};

export default Msg;
