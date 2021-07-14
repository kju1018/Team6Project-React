import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import "./scrollbar1.css"
import NoticeDetail from "./NoticeDetail";
import NoticeAdd from "./NoticeAdd";
import { getNoticeList } from "apis/Main";
function Notice(props){
  const [a, setA] = useState(1);//상태데이터 선언 문법
  //자바에서 int a = 1;와 같음
  //setA(바꿔주고싶은값)
  //a = 2;(자바) setA(2)

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState([]);
  //공지사항을 가져올 list 
  const [board, setBoard] = useState({});
  
  const work = async() => {
    const response = await getNoticeList(); //백이랑 통신
    console.log(response.data);
    setSelectedNotice(response.data);
  }

  useEffect(() => {
    work();
  }, [])

  const handleShow =(board) => {
    setShow(true);
    setBoard(board);
  }
  
  const handleClose = () => {
    setShow(false);
  }
  

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

return(
  <>
  <h5>NOTICE <img src="/pencil.png"width="25"height="25"/>
      <Button variant="outline-primary" style={{float: "right"}} onClick={handleShow1}>
      <img src="/pen.png"width="25"height="25"/></Button>
    </h5> 
    <NoticeAdd show={show1} handleClose1={handleClose1} work={work}></NoticeAdd>
  <div className="scrollbar" id="style-7">
    <div className="force-overflow-auto">
   <table className="table table-hover">
     <thead className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
       <tr>
         <th scope="col">#</th>
         <th scope="col">작성자</th>
         <th scope="col">제목</th>
         <th scope="col">날짜</th>
       </tr>
     </thead>
     <tbody>
       {console.log(selectedNotice)}
       {selectedNotice.length != 0 &&
       selectedNotice.map((board,index) => {
         return(
           <tr key={board.noticeid} onClick={()=>{handleShow(board);}} /*onClick={handleShow(board)}*/ >
             <th style={{width:"100px"}}>{index}</th>
             <th style={{width:"200px"}}>{board.userid}</th>
             <th>{board.title}</th>
             <th style={{width:"200px"}}>{board.date}</th>
           </tr>
         )
       })}
     </tbody>
    </table>
    </div>
    </div>
      
    <NoticeDetail board={board} show={show} handleClose={handleClose}></NoticeDetail>
  </>
)
}

export default Notice;