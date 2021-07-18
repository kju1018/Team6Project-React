import { Button, Modal } from "react-bootstrap";

function ImgDetailModal(props) {
  return (
    <Modal animation={false} show={props.show} onHide={props.closeImgModal} size="xl" centered>
      <Modal.Header closeButton style={{backgroundColor:"#1B296D"}}>
        <Modal.Title style={{color:"#FFFFFF"}}>사진 상세</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {props.selectedImg.imgid != null ? 
        <a href={`http://localhost:8080/treatment/imgdownload/${props.selectedImg.imgid}`}>
          <img width={"100%"} height={"100%"}  src={`http://localhost:8080/treatment/imgdownload/${props.selectedImg.imgid}`}></img>
        </a>
        :
        null
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={props.closeImgModal}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImgDetailModal;