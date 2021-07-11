import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import Item from "views/components/Item";
import { Link } from "react-router-dom";
import { getBoardList } from "./data/Data";
import HospitalNoticeDetail from "./HospitalNoticeDetail";
function HospitalNotice(props){
  const [show, setShow] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState([]);
  //공지사항을 가져올 list 
  const [board, setBoard] = useState({});


  useEffect(() => {
    setSelectedNotice(getBoardList());
  }, [])

  const handleShow = (board) => {
    setShow(true);
    setBoard(board);
  }

  const handleClose = () => {
    setShow(false);
  }

return(
  <>
  <h5>NOTICE <img src="/pencil.png" width="25"height="25"/></h5> 
  <div className="overflow-auto" style={{height:"718px"}}>
    <table className="table table-hover mb-0" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
      <thead className="card-header text-center">
        <tr>
          <th width="90px">#</th>
          <th width="153px">작성자</th>
          <th width="170px">제목</th>
          <th width="170px">날짜</th>
        </tr>
      </thead>
    </table>
    {selectedNotice.length != 0 &&
    selectedNotice.map((board, index) => {
      return (
        <div key={board.bno} onClick={() => {handleShow(board)}} className="border-bottom d-flex text-center" style={{heght:"40px", cursor:"pointer"}}>
          <div style={{width:"90px", fontWeight:"bold", padding:"12px"}}>{index}</div>
          <div style={{width:"153px", padding:"12px"}}>{board.bwriter}</div>
          <div style={{width:"170px", padding:"12px"}}>{board.btitle}</div>
          <div style={{width:"170px", padding:"12px"}}>{board.bdate}</div>
        </div>
      )
    })
    }
  </div>

  <HospitalNoticeDetail board={board} show={show} handleClose={handleClose}></HospitalNoticeDetail>
  </>
)
}

export default HospitalNotice;