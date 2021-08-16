import React, {useContext, useState} from 'react';
import {Context} from '../..';
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from 'firebase/app';
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from '../loader/loader';
import './chat.scss';

const Chat = () => {
  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  const [msg, setMsg] = useState(``);
  // eslint-disable-next-line no-unused-vars
  const [message, loading] = useCollectionData(
      firestore.collection(`messages`).orderBy(`createdAt`)
  );

  const sendMessage = async () => {
    firestore.collection(`messages`).add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    setMsg(``);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main-container">
      <div className="head-container">
        <h1>Mark Zuckerberg</h1>
        <a href="#" className="btn">
          <img src="https://svgshare.com/i/Knn.svg" alt="close" className="delete"/>
        </a>
      </div>

      <div className="message-container-wrapper">
        <div className="message-container">
          <h3><span className="date">Today</span></h3>
          <div className="sent">
            <h5 className="hour">10:53</h5>
            <p className="sent-bubble">
              Hi, Mark! I made a new design for Messenger App.
            </p>
          </div>
          <div className="sent">
            <h5 className="hour">10:53</h5>
            <p className="sent-bubble">
              Hi, Mark! I made a new design for Messenger App. Hi, Mark! I made a new design for Messenger App.
              Hi, Mark! I made a new design for Messenger App. Hi, Mark! I made a new design for Messenger App.
            </p>
          </div>
          <div className="sent">
            <h5 className="hour">10:53</h5>
            <p className="sent-bubble">
              Hi, Mark! I made a new design for Messenger App.
            </p>
          </div>
          <div className="received">
            <h5 className="hour">10:57</h5>
            <p className="received-bubble">Yo! Send it to my assistant and we will review it during the year.</p>
          </div>
          <div className="sent">
            <h5 className="hour">11:03</h5>
            <p className="sent-bubble">But Mark...</p>
          </div>
          <div className="blocked">
            <h5 className="hour">11:05</h5>
            <p className="blocked-bubble">You were blocked by the user</p>
          </div>
        </div>
      </div>

      <div className="input-container">
        <textarea
          value={msg}
          onChange={({target}) => setMsg(target.value)}
          placeholder="Enter your message" />
        <a
          onClick={sendMessage}
          href="#" className="btn">Send</a>
      </div>
    </div>
  );
};

export default Chat;
