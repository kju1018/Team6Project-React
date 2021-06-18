
import { useState } from "react";
import { Button, ButtonGroup, Nav, Row, Tab, TabContent, Tabs, ToggleButton } from "react-bootstrap";
import Item from "views/components/Item";
import PrescriptionHeader from "./components/PrescriptionHeader";
import "views/style/patientWaiting.css";

function PatientWaiting(props) {

  const [listtype, setListtype] = useState("wait");

  const handleChange = (key) => {
    setListtype(key);
  }

  return (
    <>
    <PrescriptionHeader headertitle="환자 리스트" buttonname="환자 검색"/>
    <Tab.Container id="left-tabs-example" defaultActiveKey="wait" onSelect={handleChange}>
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
        <Tab.Pane eventKey="wait">
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>          
        </Tab.Pane>
        <Tab.Pane eventKey="complete">
          sssssssssdsdfdsf
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    </>
  );
}

export default PatientWaiting;