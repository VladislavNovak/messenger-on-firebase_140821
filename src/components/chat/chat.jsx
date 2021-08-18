import React, {useContext, useEffect, useRef} from 'react';
import {Context} from '../..';
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from 'firebase/app';
import {useCollectionData} from "react-firebase-hooks/firestore";
import dayjs from 'dayjs';
import {ChatBottom, Loader} from '..';
import './chat.scss';

const Chat = () => {
  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(firestore.collection(`messages`).orderBy(`createdAt`));
  const bottomChat = useRef(null);

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
    if (bottomChat.current) {
      bottomChat.current.scrollIntoView({behavior: `smooth`, block: `end`});
    }
  }, [messages]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <h1 className="chat__header-title">Mark Zuckerberg</h1>
        <a href="#" className="btn">
          <img src="https://svgshare.com/i/Knn.svg" alt="close" className="delete"/>
        </a>
      </div>

      <div className="chat__main">
        <div className="chat__main-list">
          <h3><span className="date">Today</span></h3>

          {messages.map(({uid, text, createdAt}, index) => (
            <div key={`${uid}-${text}-${index}`} className={uid === user.uid ? `sent` : `received`}>
              <h5 className="chat__main-hour">{createdAt ? dayjs(createdAt.toDate()).format(`DD/MM/YYYY HH:MM`) : null}</h5>
              <p className={uid === user.uid ? `sent-bubble` : `received-bubble`}>{text}</p>
            </div>
          ))}

          <div className="endmessage" ref={bottomChat}></div>
        </div>
      </div>

      <ChatBottom onClickChatBottom={sendMessage} />
    </div>
  );
};

export default Chat;
