import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ChatMsg } from '../pages/index';
import { useEffect, useRef } from 'react';

const config = {
   apiKey: "AIzaSyBIg_ks8lpfs3vYtdBj4OVVrjlC1pYPm8Y",
    authDomain: "code-chat-ee75d.firebaseapp.com",
    projectId: "code-chat-ee75d",
    storageBucket: "code-chat-ee75d.appspot.com",
    messagingSenderId: "380505941395",
    appId: "1:380505941395:web:edd76ea401a080f89b7466",
    measurementId: "G-J6S5L8R4BL"
};

const firebaseApp = firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(config)
const firestore = firebase.firestore();

export default function Chats(){

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'desc').limit(100);
  const [ messages ] = useCollectionData(query, { idField: 'id' });
  const bottomRef = useRef();
  const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    };

  useEffect(() => {
        scrollToBottom()
    }, [ messages ]);

    useEffect(() => {
        scrollToBottom()
    }, []);


  return (
    <>
      <div className="p-5" style={{
          overflowY: 'scroll',
          position: 'absolute',
          height: '50%',
          left: '33.333333%',
          right: '17%',
          height: '83%'
        }}>
        {messages && messages.reverse().map(msg => <ChatMsg key={msg.id} message={msg}/>)}
        <div ref={bottomRef} className="list-bottom"></div>
      </div>
    </>
  );
}
