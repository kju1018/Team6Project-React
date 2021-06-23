
import React, { useCallback, useEffect, useState } from "react";
import { Badge, Button, ButtonGroup, Nav, Row, Tab, TabContent, Tabs, ToggleButton } from "react-bootstrap";
import ButtonHeader from "./components/ButtonHeader";
import "views/style/patientWaiting.css";
import SearchPatient from "./components/SearchPatient";
import { useDispatch } from "react-redux";
import { createSetPatient } from "redux/patient-reducer";
import { getPatients } from "./data/PatientData";
import Item from "views/components/Item";
function ReceptionList(props) {
  const [show, setShow] = useState(false);
  console.log("ReceptionList");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const property = ["patientid", "patientname", "sex", "state"];

  const [waitingPatientList, setWaitingPatientList] = useState(null);
  const [completePatientList, setCompletePatientList] = useState(null);

  useEffect(() => {
    setWaitingPatientList(getPatients("대기"));
    setCompletePatientList(getPatients("완료"));
    console.log(waitingPatientList);
  }, [])//마운트 될 때 로딩

  const selectPatient = useCallback((patient) => {
    props.selectPatient(patient);
  }, [props]);
  return (
    <>
      <ButtonHeader headertitle="접수 리스트" iclassName="bi bi-list-task " color="#9ACAA1" btnicon="bi bi-search" buttonname="환자 검색" onclick={handleShow}/>
      <SearchPatient show={show} handleClose={handleClose} selectPatient={selectPatient}></SearchPatient>
      <Tab.Container id="left-tabs-example" defaultActiveKey="wait">
        <Nav fill variant="tabs" className="flex-column">
          <Row className="ml-0 mr-0">
            <Nav.Item>
              <Nav.Link eventKey="wait">대기<Badge pill variant="secondary" className="ml-1">{waitingPatientList != null && waitingPatientList.length}</Badge></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="complete">완료<Badge pill variant="secondary" className="ml-1">{completePatientList != null && completePatientList.length}</Badge></Nav.Link>
            </Nav.Item>
          </Row>
        </Nav>
        <Tab.Content className="overflow-auto pt-2" style={{height:"calc(100% - 95px)"}}>
          <Tab.Pane eventKey= "wait" className="pt-1">
            {waitingPatientList !=null &&
            waitingPatientList.map (patient => {
              return (
                <Item key={patient.patientid} item={patient} property={property} onClick={selectPatient}></Item>
              );
            })}
          </Tab.Pane>

          <Tab.Pane eventKey="complete" className="pt-1">
            {completePatientList !=null &&
            completePatientList.map (patient => {
              return (
                <Item key={patient.patientid} item={patient} property={property} onClick={selectPatient}></Item>
              );
            })}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
}

export default ReceptionList;
//TODO: React.memo사용 생각해보기


















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