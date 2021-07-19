import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

function WeeklyWrite(props){

  return (
    <>
    <Modal show={props.show} onHide={props.handleClose}>
              <Form>
                <h4 className="text-center">WEEKLY <img src="/weekly.png"width="25"height="25"/></h4>
                <hr></hr>
                <Form.Group className="mb-3, text-center" controlId="exampleForm.ControlTextarea1">
                  <Form.Label><strong>내용</strong></Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
              <Modal.Footer>
              <Button variant="primary" onClick={props.handleClose1}>
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