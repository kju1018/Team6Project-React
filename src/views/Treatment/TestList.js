import { useEffect, useState } from "react";
import { Accordion, Alert, Badge, Button, Card, Carousel, Col, Container, Image, Row, Toast } from "react-bootstrap";
import ButtonHeader from "./components/ButtonHeader";
import PackageTest from "./components/PackageTest";
import PrescriptionTestsModal from "./components/PrescriptionTestsModal";

function TestList(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupTests, setGroupTests] = useState({});

  const info = () => {
    alert("대기중인 진료를 선택해주세요.");
  }

  const toastClose = () => {
    props.closeShow();
  }

  const prescribeTests = (prescriptionItems) => {
    props.prescribeTests(prescriptionItems);
  }
  console.log("TestList");
  useEffect(() => {
    const group = props.treatmentTests.reduce((gt, t) => {
      if(!gt[t.groupcode]){
        gt[t.groupcode] = {};
        gt[t.groupcode].groupcode = t.groupcode;
        gt[t.groupcode].groupname = t.groupname;
        gt[t.groupcode].tests = [];
        gt[t.groupcode].tests.push(t);
      } else {
        gt[t.groupcode].tests.push(t);
      }
      return gt;
    }, {});
    setGroupTests(group);
  }, [props.treatmentTests])

  return (
    <>
      <ButtonHeader headertitle="검사 목록" iclassName="bi bi-droplet" color="#E89677" btnicon="bi bi-plus-square" onclick={props.treatment.status==="진료 대기"? handleShow : info}/>
      <PrescriptionTestsModal show={show} handleClose={handleClose} staticItemList={props.staticTests} itemList={props.treatmentTests} prescribe={prescribeTests}></PrescriptionTestsModal>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        {Object.values(groupTests).map(groupTest => {
          return (
            <PackageTest key={groupTest.groupcode}  groupTest={groupTest}/>
            );
        })
        }
        {(props.treatment.state==="진료 완료" && props.treatment.treatmentdate !=="2021. 6. 30. 진료" ) ? 
        <Accordion className="mb-3">
          <Card>
            <Accordion.Toggle as={Alert} variant="dark" className="mb-0" eventKey="0">
            <span style={{fontWeight:"bold"}}>
            A1233&nbsp;&nbsp;</span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              <Accordion className="mb-3">
                  <Card border="secondary">
                    <Card.Header>
                      <Accordion.Toggle block as={Button} size="sm" variant="outline-light" eventKey="0">
                        <span style={{fontSize:"14px", fontWeight:"bold", color:"black"}}>RWS123	&nbsp;&nbsp;엑스레이<Badge variant="primary">입력완료</Badge>
                        </span>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Carousel interval={null} prevIcon={<span className="carousel-control-prev-icon bg-dark"/>} nextIcon={<span className="carousel-control-next-icon bg-dark"/>}>
                          <Carousel.Item>
                            <img
                              className="d-block"
                              src="/xray01.jpg"
                              alt="First slide"
                              width="536px"
                              height="536px"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="/xray02.jpg"
                              alt="Second slide"
                              width="536px"
                              height="536px"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="/xray03.jpg"
                              alt="Third slide"
                              width="536px"
                              height="536px"
                            />
                          </Carousel.Item>
                        </Carousel>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  </Accordion>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
          :
          ""
        }
        <div style={{position: "absolute", bottom: "40px", right: "30px"}}>
          <Row>
            <Col style={{width:"400px"}}>
              <Toast onClose={toastClose} show={props.toastShow} delay={3000} autohide>
                <Toast.Header style={{backgroundColor:"#1B296D"}}>
                  <strong className="mr-auto" style={{color:"white"}}>Message</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>진료 완료!</Toast.Body>
              </Toast>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
  
}

export default TestList;