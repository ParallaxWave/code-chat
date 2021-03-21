import React from 'react';

export default function Input(){
  
  const [msg, setMsg] = React.useState('');

  const sendMsg = e => {
    e.preventDefault();
    setMsg('');
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
