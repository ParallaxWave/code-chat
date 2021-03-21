import ChatNav from './ChatNav';
import Chats from './Chats';
import { Input } from '../pages/index';


export default function ChatArea(){
  return(
    <>
      <ChatNav text="Chat"/>
            <Chats />
            <div className="object-none object-bottom">
            <Input />
            </div>
    </>
  );
}
