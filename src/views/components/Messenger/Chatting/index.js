import AppContext from "AppContext";
import { useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

const initChatArray=  () =>{ 
    const chatArray=[];
    for(var i=0; i<1; i++){
        const chatObj = {username:"user"+i, pic:null,message:"messageasdfdsafd"+i, dateTime:new Date(),isMe:i%2===0, enabled:true}
        chatArray.push(chatObj)
    }
    return chatArray;
}

function Chatting(props){
    const chatObj = {username:"", pic:null,message:"", dateTime:null,isMe:false, enabled:false}
    const [chatArray, setChatArray] = useState([]);
    const [message, setMessage] = useState("");
    const globalUid = "내아이디"//useSelector((state)=>(state.authReducer.uid))
    const scrollRef = useRef();
    const [websocket, setWebsocket] = useState();

    useEffect(()=>{
        setMessage("");
        scrollRef.current.scrollIntoView({ behavior: 'smooth'});
    },[chatArray])
    
    useEffect(()=>{
        console.log("mount!!")
        setWebsocket(new  WebSocket('ws://localhost:8080/websocket/chatting'))
        return(()=>{
            console.log("unmount!!")
            websocket.close()
        })
    },[])
        if(websocket){
            websocket.onopen = () =>{
                console.log("open!!!")
                websocket.send(JSON.stringify({
                    header:"HELLO",
                    from:globalUid,
                    message:""
                }))
            }
        }
        
    
    const onChangeMessage = (event) =>{
        setMessage(event.target.value);
    } 
    const onKeyPress =(e)=>{
        if(e.key==="Enter"){
            sendMsg(e);
        }
    }
    const sendMsg = (event) =>{
        if(message==="")return;
      websocket.send(JSON.stringify({
        header:"CHATTING",
        from:globalUid,
        message:message
    }))
    }
    if(websocket){
    websocket.onmessage = (event) =>{
        console.log(event.data)
        var data = JSON.parse(event.data);
        setChatArray((prev)=>{
            const chatObj = {username:data.from, pic:null,message:data.message, dateTime:new Date(),isMe:data.from===globalUid, enabled:true}
        return prev.concat(chatObj) 
        })
    }
}
    
    return(
        <>
        <div className="overflow-auto" style={{height:"calc(95vh - 65px)"}}>
            <div ref={scrollRef} className=" d-flex flex-column justify-content-end bg-dark pl-3 pr-3" style={{minHeight:"calc(95vh - 65px)"}}>
                
                {chatArray.map((chat)=>{return(
                    <div  className={chat.isMe?"row p-1 justify-content-end":"row  p-1  justify-content-start"}>
                        <div>
                            <div style={{color:"white"}}>
                                {chat.isMe?globalUid:chat.username}
                            </div>
                            <div className="border" style={chat.isMe?{backgroundColor:"yellow"} : {backgroundColor:"gray"}}>
                                {chat.message}
                            </div>
                            <div style={{fontSize:"0.5em",color:"white"}}>
                            {chat.dateTime.toLocaleString()}
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            </div>
        <div className="align-items-end d-flex" >
            <input type="text" className="col-10 form-control" name="message" onKeyPress={onKeyPress} value={message} onChange={onChangeMessage} />
            <button className="col-2 btn btn-warning btn-sm p-0"style={{height:"2.5rem", fontSize:"0.9rem"}}  onClick={sendMsg}>보내기</button>
        </div>
        </>
    );
}
export default Chatting;