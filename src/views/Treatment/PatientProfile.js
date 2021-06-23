import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PatientProfile(props) {

  return (
    <>
      <div className="overflow-auto" style={{height:"calc(100% - 50px)", overflowX:"auto"}}>
        <div className="d-flex ml-0 mr-0" style={{height:"33.3%", minWidth:"200px"}}>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>이름</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.patientname}</div>
          </div>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>나이</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.age}세</div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center" style={{height:"33.3%"}}>
          <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold", paddingLeft:"15px"}}><span>주민등록 번호</span></div>
          <div className="ml-0 mr-0 row">
            <div className="col ">
              <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.ssn1}</div>
            </div>
            <div className="d-flex align-items-center">-</div>
            <div className="col">
              <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.ssn2}</div>
            </div>
          </div>
        </div>
        <div className="row ml-0 mr-0" style={{height:"33.3%"}}>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>성별</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.sex}</div>
          </div>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>전화번호</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.phonenumber}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientProfile;