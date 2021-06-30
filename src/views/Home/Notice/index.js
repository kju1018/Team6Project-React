import { Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import Item from "views/components/Item";
import "./scrollbar1.css"
function Notice(props){
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState({});
  //공지사항을 가져올 list 


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // const selectNotice = (notice) => {
  //   setSelectedNotice(notice);
  //   handleShow();
  // }

return(
  <>
  <h5>NOTICE <img src="/pencil.png"width="25"height="25"/>
      <Button variant="outline-primary" style={{float: "right"}} onClick={handleShow}>
      <img src="/pen.png"width="25"height="25"/></Button>
    </h5> 
    <Modal show={show} onHide={handleClose}>
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
              <Button variant="primary" onClick={handleClose}>
                  ADD
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
  <div className="scrollbar" id="style-7">
    <div className="force-overflow-auto">
   <table className="table table-hover">
     <thead className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
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
        <th>병원내 코로나 방역수칙안내<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={handleShow1} style={{float: "right"}}>
            자세히
          </button>
          <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>병원내 코로나 방역수칙안내</Modal.Title>
          </Modal.Header>
          <Modal.Body>최근 코로나 확산이 지속되고 있습니다. 개인위생을 철저히 하여 우리모두 코로나를 예방합시다.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose1}>
              CLOSE
            </Button>
          </Modal.Footer>
        </Modal>
        </th>
        <th>2021-06-16</th>
       </tr>
       <tr>
        <th scope="row">2</th>
        <th>김상중</th>
        <th>병원내 휴무일 안내<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={{handleShow}} style={{float: "right"}}>
            자세히
          </button>
        </th>
        <th>2021-06-16</th>
       </tr>
       <tr>
        <th scope="row">3</th>
        <th>신용권</th>
        <th>병원 근무일수 안내<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={{handleShow}} style={{float: "right"}}>
            자세히
          </button>
        </th>
        <th>2021-06-16</th>
       </tr>
       <tr>
        <th scope="row">4</th>
        <th>최은지</th>
        <th>안내사항<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={{handleShow}} style={{float: "right"}}>
            자세히
          </button>
        </th>
        <th>2021-06-16</th>
       </tr>
       <tr>
        <th scope="row">5</th>
        <th>홍미경</th>
        <th>병원 공지<button  variant="primary" type="button" class="btn btn-outline-success btn-sm" onClick={{handleShow}} style={{float: "right"}}>
            자세히
          </button>
        </th>
        <th>2021-06-16</th>
       </tr>
     </tbody>
   </table>
    </div>
    </div>
   {/* <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedNotice.}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{selectedNotice.}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal> */}
  </>
)
}

export default Notice;