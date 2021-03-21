
export default function ChannelNav(props){
  return(
    <>
      <div className="shadow-md px-4 py-2 font-bold text-lg">
        {props.text}
        <span className="float-right material-icons mr-0">
          dashboard 
        </span>
      </div>
    </>
  );
}
