import { Button, Col, Modal, Row } from "react-bootstrap";

function TestResult(props) {
  return (
    <>
      <Modal centered size="lg" show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>검사결과</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          <Col md={6}>과거 검사 목록</Col>
          <Col md={6}>
            <div>

            </div>
            <Button>파일첨부</Button>
            <div>

            </div>
            <Row>
              <Button>저장</Button>
              <Button>취소</Button>
            </Row>
          </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default TestResult;