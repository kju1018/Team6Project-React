import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Button } from 'react-bootstrap';
function Notice(props){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

return(
  <>
  <h5>NOTICE</h5>
  <div className="overflow-auto">
   <table className="table table-hover">
     <thead className="thead">
       <tr>
         <th scope="col">#</th>
         <th scope="col">작성자</th>
         <th scope="col">제목</th>
         <th scope="col">날짜</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <th scope="row">1</th>
         <th>신용권</th>
         <th>병원내 휴무일 안내<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={handleShow}>
            자세히
          </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>병원내 휴무일 안내</Modal.Title>
              </Modal.Header>
              <Modal.Body>다들 집가라 오늘은 휴무다.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
            </th>
          <th>2021-06-16</th>
       </tr>
       <tr>
         <th scope="row">1</th>
         <th>신용권</th>
         <th>병원내 휴무일 안내<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={handleShow}>
            자세히
          </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>병원내 휴무일 안내</Modal.Title>
              </Modal.Header>
              <Modal.Body>다들 집가라 오늘은 휴무다.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
            </th>
          <th>2021-06-16</th>
       </tr>
       <tr>
         <th scope="row">1</th>
         <th>신용권</th>
         <th>병원내 휴무일 안내<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={handleShow}>
            자세히
          </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>병원내 휴무일 안내</Modal.Title>
              </Modal.Header>
              <Modal.Body>다들 집가라 오늘은 휴무다.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
            </th>
          <th>2021-06-16</th>
       </tr>
       <tr>
         <th scope="row">1</th>
         <th>신용권</th>
         <th>병원내 휴무일 안내<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={handleShow}>
            자세히
          </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>병원내 휴무일 안내</Modal.Title>
              </Modal.Header>
              <Modal.Body>다들 집가라 오늘은 휴무다.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
            </th>
          <th>2021-06-16</th>
       </tr>
     </tbody>
   </table>
   </div>
  </>
)
}

export default Notice;