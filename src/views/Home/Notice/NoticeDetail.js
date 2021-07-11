import { Button, Modal } from "react-bootstrap";


function NoticeDetail(props) {
  console.log(props)
  return(
    <>
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
          <Modal.Title><strong>{props.board.title}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.board.content}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={props.handleClose}>
              CLOSE
            </Button>
            <Button variant="danger" onClick={props.handleClose}>
                  DELETE
                </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default NoticeDetail;
