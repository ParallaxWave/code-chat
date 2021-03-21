import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ChatMsg } from '../pages/index';
import { useEffect, useRef } from 'react';

const config = {
    apiKey: "AIzaSyDsf4Pu8zkx0wiyIvGZSRCjfTEfxyv42kk",
    authDomain: "coder-chat-cfa8b.firebaseapp.com",
    projectId: "coder-chat-cfa8b",
    storageBucket: "coder-chat-cfa8b.appspot.com",
    messagingSenderId: "1056086333332",
    appId: "1:1056086333332:web:37a70c492b0828f4c6e181",
    measurementId: "G-SMW77E1XT2"
};

const firebaseApp = firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(config)
const firestore = firebase.firestore();

export default function Chats(){

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25);
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
