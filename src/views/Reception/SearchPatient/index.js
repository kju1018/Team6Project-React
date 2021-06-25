import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import SearchPatientModal from "./SearchPatientModal";
import TestSelectorModal from "./TestSelectorModal";
import RegisterPatientModal from "./RegisterPatientModal";
import RegisterReservationModal from "./RegisterReservationModal";
import PatientProfile from "../components/PatientProfile";
import ReceptionHeader from "../components/ReceptionHeader";
function SearchPatient(props){
    const [searchModalshow, setSearchModalshow] = useState(false);
    const [reservationRegisterhModalshow, setreservationRegisterhModalshow] = useState(false);
    const [patientRegisterhModalshow, setPatientRegisterhModalshow] = useState(false);
    const [testSelectorModalshow, setTestSelectorModalshow] = useState(false);
    // 모달창에서 선택된 환자 상태
    const [selectedPatient, setSelectedPatient] = useState({
      patientname:"환자이름", 
      ssn1:"-", 
      ssn2:"-", 
      sex: "성별",
      age:"-",
      phonenumber: "-", 
    });

    //모달창 닫는 함수
    const closeModal= (modalname) =>{
    // 모달일때 모달종류에 따라 닫아줌
      if(modalname==="RegisterPatientModal"){
        setPatientRegisterhModalshow(false)
      }
      else if(modalname==="SearchPatientModal"){
        setSearchModalshow(false);
      }
      else if(modalname==="RegisterReservationModal"){
        setreservationRegisterhModalshow(false)
      }
      else if(modalname==="TestSelectorModal"){
        setTestSelectorModalshow(false)
      }
    
    }

   // 환자 프로필에 변수저장 
   const setPatient = (patient)=>{
     if(patient){
      const tmpPatient = {
        patientname:patient.name, 
        ssn1:patient.ss1, 
        ssn2:patient.ss2, 
        sex: patient.sex,
        age:patient.age,
        phonenumber: patient.phone, 
      }
      setSelectedPatient(tmpPatient)
     }
  }
    //props(외부 - 예약컴포넌트에서 선택한 환자)를 상태에 세팅
    useEffect(()=>{
      console.log(props.selectedPatient)
      if(props.selectedPatient){
        setPatient(props.selectedPatient)
      }
     
    },[props.selectedPatient])


    return(
    <div className="pl-3 pr-3 pb-3" style={{height:"316px", backgroundColor:"white"}} >
      
        <ReceptionHeader headertitle="환자정보" iclassName="bi bi-person-square " color="#9ACAA1">
                <button  style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setSearchModalshow(true)}}>환자검색</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setreservationRegisterhModalshow(true)}}>예약</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setPatientRegisterhModalshow(true)}}>신규등록</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setTestSelectorModalshow(true)}}>검사접수</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" >진료접수</button>
        </ReceptionHeader>
        <PatientProfile selectedPatient={selectedPatient}/>
        
        
      <Modal backdrop="static" size="lg" show={searchModalshow}  onHide={()=>{setSearchModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>환자검색</Modal.Title>
        </Modal.Header>
        <Modal.Body><SearchPatientModal closeModal={closeModal} setSelectedPatient={setPatient} patientList ={props.patientList}/></Modal.Body>
      </Modal>

      <Modal  backdrop="static" size="lg" show={reservationRegisterhModalshow} onHide={()=>{setreservationRegisterhModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>예약등록</Modal.Title>
        </Modal.Header>
        <Modal.Body><RegisterReservationModal closeModal={closeModal} patientList ={props.patientList}/></Modal.Body>
      </Modal>

      <Modal  backdrop="static" size="lg" show={patientRegisterhModalshow} onHide={()=>{setPatientRegisterhModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>신규등록</Modal.Title>
        </Modal.Header>
        <Modal.Body><RegisterPatientModal closeModal={closeModal} setSelectedPatient={setPatient}/></Modal.Body>
      </Modal>

      <Modal  backdrop="static" show={testSelectorModalshow} onHide={()=>{setTestSelectorModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>검사선택</Modal.Title>
        </Modal.Header>
        <Modal.Body><TestSelectorModal closeModal={closeModal}/></Modal.Body>
      </Modal>
        
    </div>

        
            
    )
}

export default SearchPatient;