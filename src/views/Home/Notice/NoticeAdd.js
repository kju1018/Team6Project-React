const { Modal, Form, Button } = require("react-bootstrap");

function NoticeAdd(props) {

  return(
    <>
    <Modal show={props.show} onHide={props.handleClose}>
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
              <Button variant="primary" onClick={props.handleClose}>
                  ADD
                </Button>
                <Button variant="danger" onClick={props.handleClose}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
    </>
  )
}