import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import markdown from 'markdown';
import ReactPlayer from 'react-player/youtube';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://dopeywirelessrate.multi76.repl.co";

import ChatArea from '../components/ChatArea';
import ChannelArea from '../components/ChannelArea';
import UserArea from '../components/UserArea';
import Head from 'next/head';


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

const auth = firebase.auth();
const firestore = firebase.firestore();
const messagesRef = firestore.collection('messages');



export default function Home() {

  const [ user ] = useAuthState(auth);
//   async function test(){
//    const req = await fetch('https://dopeyWirelessRate.multi76.repl.co/', {
//      method: 'POST',
//      headers: {
//        "Content-type": "application/json"
//      },
//      body: JSON.stringify({msg: 'hi lol recurse here'})
//    });
//    const res = await req.json();
//    console.log(res);
//  }
//  test();
  

  return (
   <> 
     { user ? <div><Main/></div>: <SignIn/>}
   </> 
  );
}


  

function Main(){
  React.useEffect(() => {

//     const socket = socketIOClient(ENDPOINT);

  }, []); 
  
  return (
      <> 
    <Head>
      <title>Code Chat</title>
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
        <button 
          onClick={signInWithGoogle}
          style={{
          background: '#61afef',
          border: 'none',
          outline: 'none',
          borderRadius: 4,
          padding: 12,
          fontSize: 32,
          color: '#e5f9f0'
          }}>
          Sign In with Google
        </button>
      </div>
    </>
  );
}

export function ChatMsg(props){
  const { text, uid, photoURL, createdAt, user, botName } = props.message;
  let out = text;
  if(text.includes('**') || text.includes('*')){
    out = <span dangerouslySetInnerHTML={{__html: markdown.markdown.toHTML(text).slice(3).slice(0,-4)}} />
  }
    else if((text.includes('http://') || text.includes('https://')) && text.match(/\.(jpeg|jpg|gif|png)$/) != null){
      out = <img src={text} className="mt-3 rounded-sm shadow-sm" style={{ maxWidth: "350" }}/>
  }
  else if(text.includes('youtube.com/watch?v')){
    out = <span><a href={text} className="text-blue-500">{text}</a><br /><br /><div className="p-4 rounded-md shadow-md" style={{ background: '#292b2f' }}><ReactPlayer controls width="300" url={text}/></div></span>
  }
  else if(text.includes('http://') || text.includes('https://')){
    out = <a href={text} target="_blank" className="text-blue-500">{text}</a>
    }
  return (
    <>
      <div className="mt-3">
          <img src={ photoURL } className="rounded-full inline mr-2" width="24"/> 
          <span className="font-bold mr-3 break-words">
            { user || botName } :  
          </span>
          <span className="break-words">
            { out }
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
            <button className="material-icons focus:outline-none" style={{ fontSize: 24 }}>add_circle</button>
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
