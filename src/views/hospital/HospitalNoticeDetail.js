import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBoard } from "./data/Data";
function HospitalNoticeDetail(props){
  
  return(
    <>
      <Modal animation={false} show={props.show} onHide={props.handleClose} size="lg" centered>
        <Modal.Header closeButton style={{backgroundColor:"#1B296D"} }>
          <Modal.Title style={{color:"#FFFFFF"}}><h5>NOTICE DETAIL</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="overflow-auto border" style={{height:"718px"}}>
            <div className="mr-4 ml-4 d-flex align-items-center pt-3" style={{height:"50px"}}><h4>{props.board.btitle}</h4></div>
            <div className="ml-4 mr-4 border-bottom pb-3" style={{color:"#A8A8A8",height:"40px"}}>{props.board.bdate}</div>
            <div className="p-3" style={{height:"580px"}}>
              {props.board.bcontent}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={props.handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default HospitalNoticeDetail;