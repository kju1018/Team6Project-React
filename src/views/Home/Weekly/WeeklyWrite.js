import { scheduleUpdate } from "apis/Main";
import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function WeeklyWrite(props){

  const globalUserid = useSelector((state) => {
    return state.authReducer.userid;
  });

  const [board, setBoard] = useState({
    content: ""
  });

  const handleChange = (event) => {
    setBoard({
      ...board,
      [event.target.name]: event.target.value
    });
  };

  const handleAdd = async(event) => {
    event.preventDefault();
    const newBoard = {...board};
    newBoard.userid = globalUserid;
    newBoard.date = props.startDate;
    await scheduleUpdate(newBoard);
    props.handleClose1();
    props.work();
    alert('스케줄을 등록 하였습니다!');
  }

  return (
    <>
    <Modal show={props.show} onHide={props.handleClose}>
              <Form onSubmit={handleAdd}>
                <h4 className="text-center">WEEKLY <img src="/weekly.png"width="25"height="25"/></h4>
                <hr></hr>
                <Form.Group className="mb-3, text-center" controlId="exampleForm.ControlTextarea1">
                  <Form.Label><strong>내용</strong></Form.Label>
                  <Form.Control as="textarea" rows={3} name="content" value={board.content} onChange={handleChange}/>
                </Form.Group>
              </Form>
              <Modal.Footer>
              <Button variant="primary" onClick={handleAdd}>
                  ADD
                </Button>
                <Button variant="danger" onClick={props.handleClose1}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
            </>
  );
};

export default WeeklyWrite;