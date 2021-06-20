
import { useState } from "react";
import { Button, ButtonGroup, Nav, Row, Tab, TabContent, Tabs, ToggleButton } from "react-bootstrap";
import ButtonHeader from "./components/ButtonHeader";
import "views/style/patientWaiting.css";
import ReceptionContents from "./components/ReceptionContents";
function ReceptionList(props) {

  return (
    <>
      <ButtonHeader headertitle="접수 리스트" buttonname="환자 검색"/>
      <Tab.Container id="left-tabs-example" defaultActiveKey="wait">
        <Nav fill variant="tabs" className="flex-column mb-2">
          <Row className="ml-0 mr-0">
            <Nav.Item>
              <Nav.Link eventKey="wait">대기</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="complete">완료</Nav.Link>
            </Nav.Item>
          </Row>
        </Nav>
        <Tab.Content className={`overflow-auto`} style={{height:"calc(100% - 90px)"}}>
          <ReceptionContents eventKey="wait" type="대기"/>
          <ReceptionContents eventKey="complete" type="완료"/>
        </Tab.Content>
      </Tab.Container>
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