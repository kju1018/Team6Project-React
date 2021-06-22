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
          <Col md={6}>
            <div>
              과거 검사 목록
            </div>
            <div></div>
          </Col>
          <Col md={6}>
            <div>
              <div>진료 검사 및 기록</div>
              <Row>
                <div className="col-6" style={{height: "200px"}}></div>
                <div className="col-6" style={{height: "200px"}}></div>
              </Row>
            </div>
            <div className="text-right"><Button className="btn btn-dark btn-sm">파일첨부</Button></div>
            <div style={{height: "200px"}}>

            </div>
            <div className="text-right">
                <Button className="btn btn-dark btn-sm mr-1 block">저장</Button>
                <Button className="btn btn-dark btn-sm block">취소</Button>
            </div>
          </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default TestResult;