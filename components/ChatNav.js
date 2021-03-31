import React from 'react';
import Pins from './Pins';

export default function ChatNav(props){
  const [showPins, setShowPins] = React.useState(false);
  return(
    <>
      <div className="shadow-md px-4 py-2 font-bold text-lg">
        # {props.text}
        <span className="float-right material-icons mr-0">
          <button className="focus:outline-none mr-2" /*onClick={() => setShowPins(!showPins)}*/>push_pin</button>
          add_circle 
        </span>
        { showPins && <Pins close={ () => setShowPins(!showPins) }/> }
      </div>
    </>
  );
}
