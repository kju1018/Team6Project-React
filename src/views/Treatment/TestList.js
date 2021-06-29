import { useEffect, useState } from "react";
import { Accordion, Alert, Badge, Button, Card, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import ButtonHeader from "./components/ButtonHeader";
import PackageTest from "./components/PackageTest";
import PrescriptionTestsModal from "./components/PrescriptionTestsModal";

function TestList(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupTests, setGroupTests] = useState([]);

  const info = () => {
    alert("대기중인 진료를 선택해주세요.");
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
      <ButtonHeader headertitle="검사 목록" iclassName="bi bi-droplet" color="#E89677" btnicon="bi bi-plus-square" onclick={props.treatment.state==="진료 대기"? handleShow : info}/>
      <PrescriptionTestsModal show={show} handleClose={handleClose} staticItemList={props.staticTests} itemList={props.treatmentTests} prescribe={prescribeTests}></PrescriptionTestsModal>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        {Object.values(groupTests).map(groupTest => {
          return (
            <PackageTest key={groupTest.groupcode}  groupTest={groupTest}/>
            );
        })
        }
        {props.treatment.state==="진료 완료" ? 
        <Accordion className="mb-3">
        <Card>
          <Accordion.Toggle as={Alert} variant="dark" className="mb-0" eventKey="0">
          <span style={{fontWeight:"bold"}}>
          123&nbsp;&nbsp;묶음 처방</span>
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
                            className="d-block w-100"
                            src="/doctor1.png"
                            alt="First slide"
                            width="100%"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src="/doctor1.png"
                            alt="Second slide"
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src="/doctor1.png"
                            alt="Third slide"
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
      </div>
    </>
  );
  
}

export default TestList;