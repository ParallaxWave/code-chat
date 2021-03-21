import ChannelNav from './ChannelNav';
import { UserBar } from '../pages/index';


export default function ChannelArea(){
  return(
    <>
      <ChannelNav text="Channels"/>
      <div className="object-none object-bottom">
        <UserBar />
      </div>
    </>
  );
}
