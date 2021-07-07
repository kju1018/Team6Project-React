import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import Item from "views/components/Item";
import "./scrollbar1.css"
import { getBoardList } from "./data/Data";
import NoticeDetail from "./NoticeDetail";
function Notice(props){
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState([]);
  //공지사항을 가져올 list 
  const [board, setBoard] = useState({});

  useEffect(() => {
    setSelectedNotice(getBoardList());
    console.log(selectedNotice);
  }, [])

  const handleShow = () => (board) => {
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
      <Button variant="outline-primary" style={{float: "right"}} onClick={handleShow}>
      <img src="/pen.png"width="25"height="25"/></Button>
    </h5> 
    <Modal show={show} onHide={handleClose}>
              <Form className="text-center">
                <h4>NOTICE<img src="/pencil.png"width="25"height="25"/></h4>
                <hr></hr>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label><strong>작성자</strong></Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label><strong>내용</strong></Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
              <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                  ADD
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
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
           <tr key={board.noticeid} onClick={()=>{handleShow(board)}}>
             <th>{index}</th>
             <th>{board.userid}</th>
             <th>{board.title}</th>
             <th>{board.date}</th>
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