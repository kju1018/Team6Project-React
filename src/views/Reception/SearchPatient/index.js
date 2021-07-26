import { Modal, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import SearchPatientModal from "./SearchPatientModal";
import TestSelectorModal from "./TestSelectorModal";
import RegisterPatientModal from "./RegisterPatientModal";
import UpdatePatientModal from "./UpdatePatientModal";
import RegisterReservationModal from "./RegisterReservationModal";
import PatientProfile from "./PatientProfile";
import ReceptionHeader from "../components/ReceptionHeader";
import PatientHistory from "./PatientHistory";
import { useDispatch } from "react-redux";
import DoctorSelectorModal from "./DoctorSelectorModal";
function SearchPatient(props){
    const [searchModalshow, setSearchModalshow] = useState(false);
    const [reservationRegisterhModalshow, setreservationRegisterhModalshow] = useState(false);
    const [patientRegisterhModalshow, setPatientRegisterhModalshow] = useState(false);
    const [patientUpdateModalshow, setPatientUpdateModalshow] = useState(false);
    const [testSelectorModalshow, setTestSelectorModalshow] = useState(false);
    const [doctorSelectorModalshow, setDoctorSelectorModalshow] = useState(false);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    // 모달창에서 선택된 환자 상태
    const [selectedPatient, setSelectedPatient] = useState({
      patientid:"-",
      patientname:"-", 
      ssn1:"-", 
      ssn2:"-", 
      sex: "-",
      age:"-",
      phonenumber: "-", 
      lasttreatment:"-",
      registerday:"-"
    });
    //모달창 닫는 함수
    const closeModal= (modalname) =>{
    // 모달일때 모달종류에 따라 닫아줌
      if(modalname==="RegisterPatientModal"){
        setPatientRegisterhModalshow(false)
      }
      else if(modalname==="UpdatePatientModal"){
        setPatientUpdateModalshow(false);
      }
      else if(modalname==="SearchPatientModal"){
        setSearchModalshow(false);
      }
      else if(modalname==="RegisterReservationModal"){
        setreservationRegisterhModalshow(false)
      }
      else if(modalname==="TestSelectorModal"){
        setTestSelectorModalshow(false)
      } else if(modalname==="DoctorSelectorModal"){
        setDoctorSelectorModalshow(false)
      }
    
    }

   // 환자 프로필에 변수저장 
   const setPatient = (patient)=>{
   
     if(patient){
      const tmpPatient = {
        patientid:patient.patientid,
        patientname:patient.patientname, 
        ssn1:patient.ssn1, 
        ssn2:patient.ssn2, 
        sex: patient.sex,
        age:patient.age,
        phonenumber: patient.phonenumber, 
        registerday: patient.registerday,
        lasttreatment: patient.lasttreatment?patient.lasttreatment:"-"
      }
      setSelectedPatient(tmpPatient)
     }
  }
  //로딩 스피너 끄고 키는 함수
  const ControlLoading=(bool)=>{
    setLoading(bool)
  }
   
    return(
   <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"96vh", backgroundColor:"white"}} >
        <ReceptionHeader headertitle="환자정보" iclassName="bi bi-person-square " color="#9ACAA1">
                <button  style={{marginRight:"10px"}} className="btn btn-dark btn-sm" onClick={()=>{setSearchModalshow(true)}}>환자검색</button>
                 <button disabled={selectedPatient.patientname!=="-"?false:true} style={{marginRight:"10px"}} className="btn btn-dark btn-sm" onClick={()=>{setreservationRegisterhModalshow(true)}}>예약</button>
                 <button style={{marginRight:"10px"}} className="btn btn-dark btn-sm" onClick={()=>{setPatientRegisterhModalshow(true)}}>신규등록</button>
               <button disabled={selectedPatient.patientname!=="-"?false:true} style={{marginRight:"10px"}} className="btn btn-dark btn-sm" onClick={()=>{setPatientUpdateModalshow(true)}}>환자수정</button>
                <button disabled={selectedPatient.patientname!=="-"?false:true} style={{marginRight:"10px"}} className="btn btn-dark btn-sm" onClick={()=>{setTestSelectorModalshow(true)}}>검사접수</button>
                 <button disabled={selectedPatient.patientname!=="-"?false:true} style={{marginRight:"10px"}} className="btn btn-dark btn-sm" onClick={()=>{setDoctorSelectorModalshow(true)}}>진료접수</button>
        </ReceptionHeader>
        <PatientProfile  selectedPatient={selectedPatient}/>
        <PatientHistory selectedPatient={selectedPatient}/> 
        
      <Modal backdrop="static" size="lg" show={searchModalshow}  onHide={()=>{setSearchModalshow(false)}}>
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}}  closeButton>
          <Modal.Title  style={{color:"white"}}>환자검색</Modal.Title>
          {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}
         
        </Modal.Header>
        <Modal.Body><SearchPatientModal controlLoading={ControlLoading} closeModal={closeModal} setSelectedPatient={setPatient}/></Modal.Body>
      </Modal>

      <Modal  backdrop="static" size="lg" show={reservationRegisterhModalshow} onHide={()=>{setreservationRegisterhModalshow(false)}}>
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}}  closeButton>
          <Modal.Title  style={{color:"white"}}>예약등록</Modal.Title>
        </Modal.Header>
        <Modal.Body><RegisterReservationModal closeModal={closeModal} selectedPatient={selectedPatient}/></Modal.Body>
      </Modal>

      <Modal  backdrop="static"  show={patientRegisterhModalshow} onHide={()=>{setPatientRegisterhModalshow(false)}}>
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}}  closeButton>
          <Modal.Title  style={{color:"white"}}>신규등록</Modal.Title>
        </Modal.Header>
        <Modal.Body><RegisterPatientModal closeModal={closeModal} setSelectedPatient={setPatient}/></Modal.Body>
      </Modal>
      <Modal  backdrop="static"  show={patientUpdateModalshow} onHide={()=>{setPatientUpdateModalshow(false)}}>
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}} closeButton>
          <Modal.Title  style={{color:"white"}}>환자수정</Modal.Title>
        </Modal.Header>
        <Modal.Body><UpdatePatientModal closeModal={closeModal} selectedPatient={selectedPatient} setSelectedPatient={setPatient}/></Modal.Body>
      </Modal>

      <Modal size="lg"  backdrop="static" show={testSelectorModalshow} onHide={()=>{setTestSelectorModalshow(false)}}>
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}} closeButton>
          <Modal.Title style={{color:"white"}}>검사선택</Modal.Title>
          {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}
          </Modal.Header>
        <Modal.Body><TestSelectorModal controlLoading={ControlLoading} closeModal={closeModal} selectedPatient={selectedPatient}/></Modal.Body>
      </Modal>
      <Modal  backdrop="static" show={doctorSelectorModalshow} onHide={()=>{setDoctorSelectorModalshow(false)}}>
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}} closeButton>
          <Modal.Title  style={{color:"white"}}>의사선택</Modal.Title>
          {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}
           </Modal.Header>
        <Modal.Body><DoctorSelectorModal controlLoading={ControlLoading} closeModal={closeModal} selectedPatient={selectedPatient}/></Modal.Body>
      </Modal>
        
    </div>

        
            
    )
}

export default SearchPatient;