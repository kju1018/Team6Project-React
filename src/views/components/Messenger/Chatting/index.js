import { loadChatting, saveChatting } from "apis/Redis";
import AppContext from "AppContext";
import { useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import ReceptionHeader from "views/Reception/components/ReceptionHeader";

const initChatArray=  () =>{ 
    const chatArray=[];
    for(var i=0; i<1; i++){
        const chatObj = {username:"user"+i, pic:null,message:"messageasdfdsafd"+i, dateTime:new Date(),isMe:i%2===0, enabled:true}
        chatArray.push(chatObj)
    }
    return chatArray;
}
// window.addEventListener('beforeunload', (event) => {
//     event.preventDefault();
//     console.log("before!!!")
//   });
function Chatting(props){
    const [chatArray, setChatArray] = useState([]);
    const [message, setMessage] = useState("");
    const globalUid= useSelector((state)=>(state.authReducer.userid))
    const scrollRef = useRef();
    const [websocket, setWebsocket] = useState();
    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollIntoView({ behavior: 'smooth'});
        }
        setMessage("");
    },[chatArray])
    window.onbeforeunload = function(e) {
         saveChatting(chatArray).then((result)=>{
             console.log("!!! save")
             console.log(result.data)
     })
      };
    useEffect(()=>{
        console.log("useeffect!!")
        let webSocket = new  WebSocket('ws://localhost:8080/websocket/chatting')
        webSocket.onopen = () =>{
            console.log("open!!!")
            //Back-end에서 이전 채팅기록 가져오기
            loadChatting().then((result)=>{
                console.log(result.data)
                setChatArray(()=>result.data)
            })
            if(scrollRef.current){
                scrollRef.current.scrollIntoView({ behavior: 'smooth'});
            }
            // webSocket.send(JSON.stringify({
            //     header:"HELLO",
            //     from:globalUid,
            //     message:""
            // }))
        }
        webSocket.onclose=()=>{
            console.log("close!!")
            webSocket.close()
        }
        webSocket.onmessage = (event) =>{
            //메시지 수신할때마다 스크롤 내리기
            console.log("onmessag!!!")
            console.log(event.data)
            console.log(globalUid)
            var data = JSON.parse(event.data);
            setChatArray((prev)=>{
                const chatObj = {username:data.from, from:data.from,message:data.message, dateTime:new Date(),isMe:data.from===globalUid, enabled:true}
            return prev.concat(chatObj) 
            })
        }
        setWebsocket(webSocket)

        return(()=>{
            webSocket.close()
        })

    },[])
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
    const clear = () =>{
        setChatArray([]);
        saveChatting([]).then((result)=>{
            console.log("!!! save")
            console.log(result.data)
    })
    }
    return(
        <div className="pl-1 pr-1 pb-3 border border-dark" style={{height:"100%"}}>
            <ReceptionHeader  headertitle="메신저" iclassName=" bi bi-chat-dots-fill " color="#ffc107">
                <button className="btn  btn-sm align-self-end mr-4" style={{backgroundColor:"#ffc107" ,color:"white"}} onClick={clear}>내역삭제</button>
            </ReceptionHeader>

         <div  className="overflow-auto mt-3" style={{height:"calc(95vh - 100px)"}}>
            
            <div  className=" d-flex flex-column justify-content-end bg-dark pl-3 pr-3" style={{minHeight:"calc(95vh - 100px)"}}>
                {chatArray&&chatArray.map((chat,index)=>{return(
                    <div ref={scrollRef} key={index}  className={chat.isMe?"row p-1 justify-content-end":"row  p-1  justify-content-start"}>
                        <div style={{ maxWidth:"70%"}}>
                            <div style={{color:"white"}}>
                                {chat.from}
                            </div>
                            <div className="border " style={ {backgroundColor:chat.isMe?"yellow":"gray",whiteSpace:"normal",wordWrap:"normal" }}>
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
        <div className="align-items-end d-flex mb-5" >
            <input type="text" className="col-10 form-control" name="message" onKeyPress={onKeyPress} value={message} onChange={onChangeMessage} />
            <button className="col-2 btn btn-warning btn-sm p-0"style={{height:"2.5rem", fontSize:"0.9rem"}}  onClick={sendMsg}>보내기</button>
        </div>
        </div>
    );
}
export default Chatting;