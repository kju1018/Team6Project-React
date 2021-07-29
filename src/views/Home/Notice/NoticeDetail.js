import { Button, Modal } from "react-bootstrap";

function NoticeDetail(props) {
  
  const handleRemove =(event) =>{
    props.deleteNoticeState(props.board.noticeid);
    props.handleClose();
    alert('공지사항을 삭제 하였습니다!');
  };

  return(
    <>
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
          <Modal.Title><strong>{props.board.title}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body style={{height:"40vh"}}><strong>{props.board.content}</strong></Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={props.handleClose}>
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

export default NoticeDetail;