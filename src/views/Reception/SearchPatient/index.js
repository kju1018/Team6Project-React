import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import SearchPatientModal from "./SearchPatientModal";
import TestSelectorModal from "./TestSelectorModal";
import RegisterPatientModal from "./RegisterPatientModal";
import RegisterReservationModal from "./RegisterReservationModal";
import PatientProfile from "views/Treatment/PatientProfile";
import ReceptionHeader from "../components/ReceptionHeader";
function SearchPatient(props){
    const [searchModalshow, setSearchModalshow] = useState(false);
    const [reservationRegisterhModalshow, setreservationRegisterhModalshow] = useState(false);
    const [patientRegisterhModalshow, setPatientRegisterhModalshow] = useState(false);
    const [testSelectorModalshow, setTestSelectorModalshow] = useState(false);
    let SelectedPatient; 
    const [patient, setPatient] = useState({
      patientname:"환자이름", 
      ssn1:"-", 
      ssn2:"-", 
      sex: "성별",
      age:"-",
      phonenumber: "-", 
    });
    const [buttonList, setButtonList] = useState([
    {name:"예약", onClick:()=>{console.log(" 예약")}}
    ])
    // 검색창에 해당 환자 선택했을때 - 변수저장 및 모달창 닫기
    const setSelectedPatient = (Patient)=>{
      SelectedPatient = Patient
      console.log("asdf"+SelectedPatient)
      setSearchModalshow(false);
    }
    console.log("render!!")
    return(
    <div className="pl-3 pr-3 pb-3" style={{height:"316px", backgroundColor:"white"}} >
      
        <ReceptionHeader headertitle="환자정보" iclassName="bi bi-person-square " color="#9ACAA1">
                <button  style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setSearchModalshow(true)}}>환자검색</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setreservationRegisterhModalshow(true)}}>예약</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setPatientRegisterhModalshow(true)}}>신규등록</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setTestSelectorModalshow(true)}}>검사접수</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" >진료접수</button>
        </ReceptionHeader>
        <PatientProfile selectedPatient={patient}/>
        
        
      <Modal backdrop="static" size="lg" show={searchModalshow}  onHide={()=>{setSearchModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>환자검색</Modal.Title>
        </Modal.Header>
        <Modal.Body><SearchPatientModal setSelectedPatient={setSelectedPatient} patientList ={props.patientList}/></Modal.Body>
      </Modal>

      <Modal  backdrop="static" size="lg" show={reservationRegisterhModalshow} onHide={()=>{setreservationRegisterhModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>예약등록</Modal.Title>
        </Modal.Header>
        <Modal.Body><RegisterReservationModal patient={SelectedPatient} patientList ={props.patientList}/></Modal.Body>
      </Modal>

      <Modal  backdrop="static" size="lg" show={patientRegisterhModalshow} onHide={()=>{setPatientRegisterhModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>신규등록</Modal.Title>
        </Modal.Header>
        <Modal.Body><RegisterPatientModal/></Modal.Body>
      </Modal>

      <Modal  backdrop="static" size="lg" show={testSelectorModalshow} onHide={()=>{setTestSelectorModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>검사선택</Modal.Title>
        </Modal.Header>
        <Modal.Body><TestSelectorModal/></Modal.Body>
      </Modal>
        
    </div>

        
            
    )
}

export default SearchPatient;