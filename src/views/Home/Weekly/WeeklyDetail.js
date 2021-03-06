import { Button, Modal } from "react-bootstrap";

function WeeklyDetail(props) {

  const handleRemove = (event) => {
    props.deleteScheduleState(props.board.scheduleid, props.board.date);
    props.handleClose1();
    alert('스케쥴을 삭제 하였습니다!');
  };

  return(
    <>
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
          <Modal.Title><strong>{props.board.userid}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body style={{height:"40vh"}}><strong>{props.board.content}</strong></Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={props.handleClose1}>
              CLOSE
            </Button>
            <Button variant="danger" onClick={handleRemove}>
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default WeeklyDetail;