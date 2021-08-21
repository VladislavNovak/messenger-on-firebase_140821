import React, {useContext, useEffect, useRef} from 'react';
import dayjs from 'dayjs';
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from 'firebase/app';
import {useCollectionData} from "react-firebase-hooks/firestore";

import {Context} from '../..';
import {ChatBottom, Loader} from '..';
import {Icon} from '../../assets/img';

// ---------------------------------------------------------------------------------------------------------

const Chat = () => {
  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(firestore.collection(`messages`).orderBy(`createdAt`));
  const aChatMainEnd = useRef(null);

  const sendMessage = async (msg) => {
    if (!msg) {
      return;
    }

    firestore.collection(`messages`).add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  useEffect(() => {
    if (messages) {
      if (messages[messages.length - 1].createdAt) {
        // eslint-disable-next-line no-console
        console.log(`time: `, messages[messages.length - 1].createdAt.toDate());
        // eslint-disable-next-line no-console
        console.log(`time: `, dayjs(messages[messages.length - 1].createdAt.toDate()).format(`DD/MM/YYYY HH:mm`));
      }
    }

    if (messages) {
      aChatMainEnd.current.scrollIntoView({behavior: `smooth`, block: `end`});
    }
  }, [messages]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header-img">
          <img className="chat__header-photoURL" src={user.photoURL} alt="close" />
        </div>
        <h1 className="chat__header-title">{user.displayName}</h1>
        <a href="#" className="btn">
          <img className="chat__header-delete" src="https://svgshare.com/i/Knn.svg" alt="close" />
        </a>
      </div>

      <div className="chat__main">
        <div className="chat__main-list">
          {messages.map(({uid, text, createdAt}, index) => (
            <div key={`${uid}-${text}-${index}`} className={`msg ${uid === user.uid ? `msg-send` : `msg-received`}`}>
              <div className="msg__content">
                <p className="msg__content-hour">{createdAt && dayjs(createdAt.toDate()).format(`HH:mm`)}</p>
                <div className="msg__control">
                  <button className="msg__control-btn">
                    <img className="msg__control-img" src={Icon.EDIT} alt="" />
                  </button>
                  <button className="msg__control-btn">
                    <img className="msg__control-img" src={Icon.DELETE} alt="" />
                  </button>
                </div>
                <p className="msg__text">{text}</p>
              </div>
            </div>
          ))}

          <div ref={aChatMainEnd}></div>
        </div>
      </div>

      <ChatBottom onClickChatBottom={sendMessage} />
    </div>
  );
};

export default Chat;
