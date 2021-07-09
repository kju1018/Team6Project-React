import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createSetTreatmentReception } from "redux/reception-reducer";

const Redis = () => {
  //-------------------------------------------------------------  
  //상태 선언
  //-------------------------------------------------------------
  const [connected, setConnected] = useState(false);
  //로그인 될때마다 토픽을 바꿔줘야함
  const [subTopic, setSubTopic] = useState("/reception");
  const [pubMessage, setPubMessage] = useState({
    topic: "/reception",
    content: "Hello"
  });
  const [contents, setContents] = useState([]);
  const dispatch = useDispatch();

  //상태 변경 내용 출력
  useEffect(() => {
    console.group("상태 변경");
      console.log("connected: ", connected);
      console.log("subTopic: ", subTopic);
      console.log("pubMessage: ", pubMessage);
      console.log("contents: ", contents);
    console.groupEnd();
  }); 

  //-------------------------------------------------------------
  //버튼 이벤트 처리
  //-------------------------------------------------------------
  let ws = useRef(null);
  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8080/websocket/redis");

    ws.current.onopen = () => {
      console.log("접속 성공");
      setConnected(true);
      sendSubTopic();
    };
    
    ws.current.onclose = () => {
      console.log("접속 끊김");
      setConnected(false);
    };
    
    ws.current.onmessage = (event) => {
      console.log("메시지 수신");
      var strJson = event.data;
      var message = JSON.parse(strJson);

      // 여기서 각 topic에 따라 dispatch!!
      if(message.topic==="/reception"){
        console.log("hiimhome!!!")
        dispatch(createSetTreatmentReception(message.content))
      }


      setContents((contents) => {
        return contents.concat(message.topic + ": " + message.content);
      });
    } 
  };

  const disconnectWebSocket = () => {
    ws.current.close();
  };

  const sendSubTopic = () => {
    var json = {topic:subTopic};		
    var strJson = JSON.stringify(json);
    ws.current.send(strJson);
  }

  //-------------------------------------------------------------
  //마운트 및 언마운트에 실행할 내용
  //-------------------------------------------------------------
  useEffect(() => {
    connectWebSocket();
    return (() => {
      disconnectWebSocket();
    });
  }, []);

  //-------------------------------------------------------------
  //렌더링 내용
  //-------------------------------------------------------------
  return (
    <>
    </>
  );
};

export default Redis;
  
  