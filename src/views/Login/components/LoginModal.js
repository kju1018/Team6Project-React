import { Button, Col, Form, Row } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function LoginModal(props) {
  return (
    <>
      <Modal centered size="lg" show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          <Col md={6} className="pr-0 pl-0"><img src="Online Doctor-pana.png" width="90%"/></Col>
          <Col md={6} className="mt-auto mb-5 pl-0">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" size="lg" block onClick={props.handleClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;