import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import SearchPatientModal from "./SearchPatientModal";
import RegisterReservation from "./RegisterReservation";
function SearchPatient(props){
    const patient = props.patientList[0]
    const [searchModalshow, setSearchModalshow] = useState(false);
    const [registerhModalshow, setRegisterhModalshow] = useState(false);

    

    return(
    <div className="d-flex flex-column" style={{height:"300px"}} >
        <div className="row ">
                <label style={{marginRight:"10px"}}>환자정보</label>
                <button  style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setSearchModalshow(true)}}>환자검색</button>
                 <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm" onClick={()=>{setRegisterhModalshow(true)}}>예약</button>
        </div>
        
        <div className="row">
            <div>
                {patient.name}
            </div>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                        <td colSpan="2">성별 : {patient.sex}</td>
                        <td  colSpan="2">Phone : {patient.phone}</td>
                        </tr>
                        <tr>
                        <td colSpan="2">나이 : {patient.age}</td>
                        <td  colSpan="2">생년월일 : {patient.ssn1}</td>
                        </tr>
                        <tr>
                        <td colSpan="2" >등록일 : {patient.registerday}</td>
                        <td  colSpan="2">진료일 : {patient.lasttreatment}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

      <Modal  backdrop="static" size="lg" show={searchModalshow} onHide={()=>{setSearchModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>환자검색</Modal.Title>
        </Modal.Header>
        <Modal.Body><SearchPatientModal patientList ={props.patientList}/></Modal.Body>
      </Modal>

      <Modal  backdrop="static" size="lg" show={registerhModalshow} onHide={()=>{setRegisterhModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>예약등록</Modal.Title>
        </Modal.Header>
        <Modal.Body><RegisterReservation patientList ={props.patientList}/></Modal.Body>
      </Modal>
        
    </div>

        
            
    )
}

export default SearchPatient;