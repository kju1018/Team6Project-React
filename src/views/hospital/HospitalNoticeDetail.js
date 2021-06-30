import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBoard } from "./data/Data";
function HospitalNoticeDetail(props){
  const bno = parseInt(props.match.params.bno);
  const [board, setBoard] = useState({});
  useEffect(() => {
    setBoard(getBoard(bno));
    console.log(board);
  },[bno])
  
  console.log(board);
return(
  <>
    {board &&
    <>
      <h5>NOTICE DETAIL</h5> 
      <div className="overflow-auto border" style={{height:"718px"}}>
        <div className="mr-4 ml-4 d-flex align-items-center pt-3" style={{height:"50px"}}><h4>{board.btitle}</h4></div>
        <div className="ml-4 mr-4 border-bottom pb-3" style={{color:"#A8A8A8",height:"40px"}}>{board.bdate}</div>
        <div className="p-3" style={{height:"580px"}}>
          {board.bcontent}
        </div>
        <div className="text-right"><Link className="btn btn-secondary btn-sm mr-3" to={`/`}>목록으로</Link></div>
      </div>
    </>
    }
  </>
)
}

export default HospitalNoticeDetail;