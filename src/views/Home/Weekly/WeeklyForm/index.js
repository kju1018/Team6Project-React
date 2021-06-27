import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

function WeeklyForm(props){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>{setShow(true); console.log("asd")} 

  return (
    <>
    <div onClick = {handleShow}>&nbsp;</div>
    <Modal show={show} onHide={handleClose}>
              <Form>
                <h4 className="text-center">WEEKLY <img src="/weekly.png"width="25"height="25"/></h4>
                <hr></hr>
                <Form.Group className="mb-3, text-center" controlId="exampleForm.ControlTextarea1">
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
            </>
  );
};

export default WeeklyForm;