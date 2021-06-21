
import { useState } from "react";
import { Button, ButtonGroup, Nav, Row, Tab, TabContent, Tabs, ToggleButton } from "react-bootstrap";
import ButtonHeader from "./components/ButtonHeader";
import "views/style/patientWaiting.css";
import ReceptionContents from "./components/ReceptionContents";
import SearchPatient from "./components/SearchPatient";
import { useDispatch } from "react-redux";
import { createSetPatient } from "redux/patient-reducer";
function ReceptionList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const loadPatient = (patient) => {
    // dispatch(createSetPatient(patient));

  }


  return (
    <>
      <ButtonHeader headertitle="접수 리스트" iclassName="bi bi-list-task " color="#9ACAA1" buttonname="환자 검색" onclick={handleShow}/>
      <Tab.Container id="left-tabs-example" defaultActiveKey="wait">
        <Nav fill variant="tabs" className="flex-column">
          <Row className="ml-0 mr-0">
            <Nav.Item>
              <Nav.Link eventKey="wait">대기</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="complete">완료</Nav.Link>
            </Nav.Item>
          </Row>
        </Nav>
        <Tab.Content className="overflow-auto pt-2" style={{height:"calc(100% - 95px)"}}>
          <ReceptionContents eventKey="wait" type="대기"/>
          <ReceptionContents eventKey="complete" type="완료"/>
        </Tab.Content>
      </Tab.Container>

      <SearchPatient show={show} handleClose={handleClose} loadPatient={loadPatient}></SearchPatient>
    </>
  );
}

export default ReceptionList;


















        {/* <Tab.Pane eventKey="wait" className="pt-1">
          {waitPatientList.map (patient => {
            return (
              <div key={patient.patientid} onClick={() => loadPatient(patient)} style={{cursor:"pointer"}}>
                <Item item={patient} property={property} fun={loadPatient}></Item>
              </div>
            );
          })}
        </Tab.Pane>
        <Tab.Pane eventKey="complete" className="pt-1">
          {completePatientList.map(patient => {
            return (
              <div key={patient.patientid} onClick={() => loadPatient(patient)} style={{cursor:"pointer"}}>
                <Item item={patient} property={property}></Item>
              </div>
            );
          })}
        </Tab.Pane> */}