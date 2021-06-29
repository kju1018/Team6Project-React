import { test } from "apis/Auth";
import AppContext, { AppContextProvider } from "AppContext";
import Chatting from "../Chatting/index";
import { useContext, useState } from "react";
function ChattingMenu(props){
    const appcontext = useContext(AppContext)
    const [isopen, setIsopen] = useState(false);
    if(appcontext.websocket!=null){
        appcontext.websocket.onopen = () =>{
            console.log("wsock open!");
        }
    }
    
    const EnterChat = (event) =>{
        
        if(appcontext.websocket==null){
            appcontext.websocket = new  WebSocket('ws://localhost:8080/webapp/echo');
            setIsopen(true);
        }else{
            setIsopen(false);
        }
    }
    return(
    <>
    {/* <button className="btn btn-outline-warning btn-lg" onClick={EnterChat}>채팅방 입장하기</button>  */}
        <Chatting/>
    </>
    )
}

export default ChattingMenu;