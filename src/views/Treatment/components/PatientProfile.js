import { useState } from "react";
import SearchPatient from "./SearchPatient";


function PatientProfile(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectPatient = (patient) => {
    props.selectPatient(patient);
  }



  return (
    <>
      <div className="h-100 pl-3 pr-3 d-flex align-items-center" style={{backgroundColor:"#15367B", marginRight:"15px", marginLeft:"15px"}}>
        {/* 8vh */}
        <div className="d-flex col">
          <div className="col-2 pl-0 pr-0 d-flex align-items-center text-center" >
            <div className="col-4 pl-0 pr-0" style={{fontWeight:"bold", color:"#FBFBFB"}}>이름</div>
            <div className="text-center pl-0 pr-0 pt-1 pb-1 ml-0 mr-0 col-8" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"7px", fontSize:"14px", backgroundColor:"#FFFFFF"}}>{props.selectedPatient.patientname}</div>
          </div>
          <div className="col-2 pl-3 pr-0 d-flex align-items-center text-center">
            <div className="col-4 pl-0 pr-0" style={{fontWeight:"bold", color:"#FBFBFB"}}>나이</div>
            <div className="text-center pl-0 pr-0 pt-1 pb-1 ml-0 mr-0 col-8" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"7px", fontSize:"14px", backgroundColor:"#FFFFFF"}}>{props.selectedPatient.age}세</div>
          </div>
          <div className="col-2 pl-3 pr-0 d-flex align-items-center text-center">
            <div className="col-4 pl-0 pr-0" style={{fontWeight:"bold", color:"#FBFBFB"}}>성별</div>
            <div className="text-center pl-0 pr-0 pt-1 pb-1 ml-0 mr-0 col-8" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"7px", fontSize:"14px", backgroundColor:"#FFFFFF"}}>{props.selectedPatient.sex}</div>
          </div>
          <div className="col-4 pl-3 pr-0 d-flex align-items-center text-center">
            <div className="col-3 pl-0 pr-0" style={{fontWeight:"bold", color:"#FBFBFB"}}>주민등록번호</div>
            <div className="text-center pt-1 pb-1 pl-0 pr-0 ml-0 mr-0 col-6" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"7px", fontSize:"14px", backgroundColor:"#FFFFFF"}}>{props.selectedPatient.ssn1} - {props.selectedPatient.ssn2}</div>
          </div>
          <div className="col-2 pl-3 pr-0  text-right">
              <button className="btn btn-light btn-sm" style={{fontWeight:"bold", fontSize:"15px"}} onClick={handleShow}>환자 검색</button>
              <button className={`btn btn-primary btn-sm ml-2 mr-5`} disabled={props.treatment.status === "진료중"? false : true} onClick={props.saveTreatment}>저장</button>
          </div>
        </div>
      </div>
      <SearchPatient show={show} handleClose={handleClose} selectPatient={selectPatient}></SearchPatient>
    </>
  );
}

export default PatientProfile;