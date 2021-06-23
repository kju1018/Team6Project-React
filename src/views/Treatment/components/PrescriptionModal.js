import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Item from "views/components/Item";

function PrescriptionModal(props) {

  const [searchName, setSearchName] = useState("");

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const search = () => {

  }

  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>환자 검색</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group mb-3 d-flex justify-content-end" style={{paddingRight:"120px"}}>
          <input type="text" onChange={handleSearchName}/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={ () => search(searchName)}>검색</button>
          </div>
        </div>
        <div style={{height:"300px"}} className="row">
          <div className="col bg-secondary">
            <div className="d-flex">
                <div className="col"></div>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="col bg-dark">
            
          </div> 
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={props.handleClose}>
          닫기
        </Button>
        <Button variant="outline-success" size="sm" onClick={() => { props.handleClose() } }>
          선택 완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PrescriptionModal;