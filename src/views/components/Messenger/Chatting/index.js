import { GetUserData } from "apis/Reception";
import { loadChatting, saveChatting, clearChatting } from "apis/Redis";
import {  useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSetToast } from "redux/toast-reducer";
import ReceptionHeader from "views/Reception/components/ReceptionHeader";

// const initChatArray=  () =>{ 
//     const chatArray=[];
//     for(var i=0; i<5; i++){
//         const chatObj = {username:"user"+i, message:"messageasdfdsafd"+i, dateTime:new Date(),isMe:i%2===0, enabled:true}
//         chatArray.push(chatObj)
//     }
//     return chatArray;
// }

// const initConnectionArray=  () =>{ 
//     const connectionArray=[];
//     for(var i=0; i<10; i++){
//         const connectionObj = {userid:"userid"+i,username:"name"+i,userrole:"role"+i,status:"connect"}
//         connectionArray.push(connectionObj)
//     }
//     return connectionArray;
// }


//나중에 로그아웃때 넘길 chatArray 값
let chatarray = [];
function Chatting(props){
    const [test, setTest] = useState("test!!")
    const [chatArray, setChatArray] = useState([]);
    const [connectionList,setConnectionList] = useState([]);
    const [message, setMessage] = useState("");
    const globalUid= useSelector((state)=>(state.authReducer.userid))
    const [userInfo, setUserInfo] = useState({})
    const scrollRef = useRef();
    const [websocket, setWebsocket] = useState();
    const [brb, setBRB] = useState(false);
    const dispatch = useDispatch();
    // 채팅칠때 스크롤 내리기
    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollIntoView({ behavior: 'smooth'});
        }
        //나중에 로그아웃때 넘길 chatArray 값 저장
        chatarray = chatArray;
    },[chatArray])

    window.onbeforeunload = function(e) {
         saveChatting(globalUid,chatArray).then((result)=>{
             console.log("!!! save!!")
             console.log(result.data)
     })
      };
    useEffect(()=>{
        //let webSocket = new  WebSocket('ws://localhost:8080/websocket/chatting')
        let webSocket = new WebSocket("ws://kosa3.iptime.org:50006/websocket/chatting")
      
        webSocket.onopen = () =>{
            console.log("open!!!")
            //Back-end에서 이전 채팅기록 가져오기
            loadChatting(globalUid).then((result)=>{
                console.log("load!!")
                if(result.data===""){
                    result.data = [];
                }
                    setChatArray(result.data )
            })

            console.log("sendHELLO!" + globalUid)
            //유저정보 불러오기
            GetUserData(globalUid).then((result)=>{
                //유저 role 한글로 바꿔주기
                if(result.data.role_authority==="ROLE_DOCTOR")result.data.role_authority="의사"
                else if(result.data.role_authority==="ROLE_NURSE")result.data.role_authority="간호사"
                else if(result.data.role_authority==="ROLE_ADMIN")result.data.role_authority="관리자"
                setUserInfo(result.data)
                //접속되면 처음 내 정보를 서버에 보내줌
                webSocket.send(JSON.stringify({
                    header:"HELLO",
                    from:globalUid,
                    connectioninfo:{userid:globalUid,username:result.data.username,userrole:result.data.role_authority,status:"접속중"},
                    message:""
                }))
            })
            
        }
        webSocket.onclose=()=>{
            console.log("sendBYE!")
        }
        webSocket.onmessage = (event) =>{
           
            
            var data = JSON.parse(event.data);
            console.log("receive" + data.header)
            //접속 패킷 받았을때
            if(data.header==="HELLO"){
                //동기화할 유저정보 리스트
                setConnectionList(data.connectionlist)
            }
            //자리 비움패킷 받았을때
            else if(data.header==="BRB"){
                //동기화할 유저정보 리스트
                setConnectionList(data.connectionlist)
            }
            //접속종료패킷 받았을때
            else if(data.header==="BYE"){
                //동기화할 유저정보 리스트
                console.log("byte!!")
                console.log(chatArray)
                setConnectionList(data.connectionlist)
            }
            //채팅 패킷 받았을때
            else if(data.header==="CHATTING"){
                console.log(data)
                dispatch(createSetToast({message:data.name+"님으로 부터 메시지 도착"}))
                setChatArray((prev)=>{
                    const chatObj = {name:data.name, from:data.from,role:data.role,message:data.message, dateTime:data.dateTime,isMe:data.from===globalUid, enabled:true}

                return prev.concat(chatObj) 
                })
            }
        }
        setWebsocket(webSocket)

        return()=>{
            console.log("로그아웃??")
        saveChatting(globalUid,chatarray).then((result)=>{
            console.log("!!! save!!")
            webSocket.close();
        })}

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
        //만약 자리비움 상태에서 채팅보냈으면 접속중으로 바꿔주기
        if(brb){
            BRB();
        }
      websocket.send(JSON.stringify({
        header:"CHATTING",
        from:globalUid,

        name:userInfo.username,

        role:userInfo.role_authority,
        dateTime:new Date().toLocaleString(),
        message:message
    }))
    setMessage("");
    }
    //채팅 내역 초기화
    const clear = () =>{
        setChatArray([]);
        clearChatting(globalUid).then((result)=>{
            console.log("!!! clear")
    })
    }
    //자리비움, 온라인 onoff
    const BRB = () =>{
      setBRB(!brb)
      websocket.send(JSON.stringify({
        header:"BRB",
        from:globalUid,
        connectioninfo:{userid:globalUid,username:userInfo.username,userrole:userInfo.role_authority,status:brb?"접속중":"자리비움"},
        message:""
    }))
    }
    return(
    <>
    <ReceptionHeader  headertitle="메신저" iclassName=" bi bi-chat-dots-fill " color="#ffc107">
        <span className="mr-5">
        아이디 : {globalUid} , 이름 : {userInfo.username}({userInfo.role_authority}) 
        </span>
        <button className="btn  btn-sm align-self-end mr-4" style={{backgroundColor:brb?"green":"red" ,color:"white"}} onClick={BRB}>{brb?"접속하기":"자리비우기"}</button>

        <button className="btn  btn-sm align-self-end mr-4" style={{backgroundColor:"#ffc107" ,color:"white"}} onClick={clear}>내역삭제</button>
    </ReceptionHeader>

    <div className="row mt-2">
        
        <div className="col-6 pr-0">
            <div className="pl-2 pr-2 pb-3 border-bottom border-left border-top border-dark" style={{height:"100%"}}>

                   <label>접속직원리스트</label>
                    <div  className="overflow-auto mb-2 border border-dark  justify-content-center" style={{height:"95%"}}>
                        {connectionList&&connectionList.map((item,index)=>{
                        return(
                            <div className="row m-0 border-bottom text-center" key={index} style={{fontSize:"1em"}}>
                                <div className="col-3 p-0 border-right">
                                {item.userid}
                                </div>
                                <div className="col-3 p-0 border-right">
                                {item.username}
                                </div>
                                <div className="col-3 p-0 border-right">
                                {item.userrole}
                                </div>
                                <div className="col-3 p-0" style={{backgroundColor:item.status==="자리비움"?"red":"green" ,color:"white"}}>
                                {item.status}
                                </div>
                            </div>                         
                            )
                        })}  
                    </div>
                    {/* <label>네트워크 상태</label>
                    <div  className="overflow-auto border border-dark" style={{height:"45%"}}>
                    
                    </div> */}

            </div>
        </div>
        <div className="col-6 pl-0">
            <div className="pl-1 pr-1 pb-3 border border-dark" style={{height:"100%"}}>
                <div  className="overflow-auto mt-3" style={{height:"calc(92vh - 136px)"}}>
                
                <div  className=" d-flex flex-column justify-content-end bg-dark pl-3 pr-3" style={{minHeight:"calc(92vh - 136px)"}}>
                    {console.log(chatArray)}
                    {chatArray&&chatArray.map((chat,index)=>{return(
                        <div ref={scrollRef} key={index}  className={chat.isMe?"row p-1 justify-content-end":"row  p-1  justify-content-start"}>
                            <div style={{ maxWidth:"70%"}}>
                                <div style={{color:"white"}}>
                                    {chat.name}({chat.role})
                                </div>
                                <div className="border " style={ {backgroundColor:chat.isMe?"yellow":"gray",wordBreak:"break-all" }}>
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
            </div>
        </div>

    </div>





    </>
    );
}
export default Chatting;