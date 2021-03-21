import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';

import ChatArea from '../components/ChatArea';
import ChannelArea from '../components/ChannelArea';
import UserArea from '../components/UserArea';
import Head from 'next/head';


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

const auth = firebase.auth();
const firestore = firebase.firestore();
const messagesRef = firestore.collection('messages');



export default function Home() {

  const [ user ] = useAuthState(auth);


  return (
   <> 
     { user ? <div><Main/></div>: <SignIn/>}
   </> 
  );
}


  

function Main(){
  
  return (
      <> 
    <Head>
      <title>Coder Chat</title>
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
		  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins"/>
		  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
    </Head>
     <div className="grid grid-cols-12 h-screen">
       <div className="col-span-1 grid grid-rows-6 text-center" style={{ background: '#202225' }}>
         <button className="text-white p-6 rounded-md material-icons hover:text-blue-500 shadow-xl m-2 rounded-sm focus:outline-none" style={{ background: '#2f3136', fontSize: 32 }} onClick={() => auth.signOut()}>
          logout 
         </button>
         <button className="text-white p-6 rounded-md material-icons hover:text-blue-500 shadow-xl m-2 rounded-sm focus:outline-none" style={{ background: '#2f3136', fontSize: 32 }}>
          settings 
         </button>
         <button className="text-white p-6 rounded-md material-icons hover:text-blue-500 shadow-xl m-2 rounded-sm focus:outline-none" style={{ background: '#2f3136', fontSize: 32 }}>
          help 
         </button>
         <button className="text-white p-6 rounded-md material-icons hover:text-blue-500 shadow-xl m-2 rounded-sm focus:outline-none" style={{ background: '#2f3136', fontSize: 32 }}>
          code 
         </button>
         <button className="text-white p-6 rounded-md material-icons hover:text-blue-500 shadow-xl m-2 rounded-sm focus:outline-none" style={{ background: '#2f3136', fontSize: 32 }}>
          people 
         </button>
         <button className="text-white p-6 rounded-md material-icons hover:text-blue-500 shadow-xl m-2 rounded-sm focus:outline-none" style={{ background: '#2f3136', fontSize: 32 }}>
          add 
         </button>
        </div>
       <div className="col-span-3" style={{ background: '#2f3136' }}>
         <ChannelArea />
        </div>
       <div className="col-span-6" >
         <ChatArea />
        </div>
       <div className="col-span-2" style={{ background: '#2f3136' }}>
         <UserArea />
        </div>

     </div>
    </>  
  );
}


function SignIn(){

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <div 
        onClick={signInWithGoogle}
        style={{  
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '100vh',
          fontSize: 40
        }}
        >
        Sign In with Google
      </div>
    </>
  );
}



export function ChatMsg(props){

  const { text, uid, photoURL, createdAt, user } = props.message;
  console.log(photoURL);
  return (
    <>
      <div className="mt-3">
          <img src={ photoURL } className="rounded-full inline mr-2" width="24"/> 
          <span className="font-bold mr-3 break-words">
            { user } :  
          </span>
          <span className="break-words">
            {text}
          </span>
      </div>
    </>
  );
}




export function Input(){
  
  const [msg, setMsg] = React.useState('');

  const sendMsg = async (e) => {
    e.preventDefault();
    const data = msg;
    setMsg('');
    if(!(msg === null || msg.match(/^ *$/) !== null)){
      const { uid, photoURL } = auth.currentUser;
      await messagesRef.add({ 
        text: data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        user: auth.currentUser.displayName
      });
    }
  };

  return (
    <>
      <form onSubmit={ e => sendMsg(e) }>
        <div className="flex">
          <div style={{
              position: 'absolute',
              bottom: 0,
              left: '33.3333333%',
              right: '17%',
              background: '#40444b'
           }} className=" m-4 px-3 py-3 font-normal rounded-sm shadow-sm flex-grow flex">
              <input 
                type="text" 
                style={{
                background: '#40444b'
                 }}
                placeholder="Type your message here" 
                className="flex-grow"
                value={msg}
                onChange={newMsg => setMsg(newMsg.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
}
export function UserBar(){
  return (
    <>
        <div style={{
          position: 'absolute',
          bottom: 0,
          background: '#292b2f',
          left: '8.33333333%',
          right: '66.66666666%'
        }} className="p-3 text-center">
          <img src={auth.currentUser.photoURL} width="30" className="rounded-full inline"/>
          <span className="font-bold ml-3 truncate">
            {auth.currentUser.displayName}
          </span>
      </div>
    </>
  );
}
