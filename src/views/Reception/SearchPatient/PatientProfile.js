function PatientProfile(props) {

    
  return (
    <>
      <div className="pt-5" style={{height:"calc(35vh - 50px)"}}>
        <div className="d-flex ml-0 mr-0" style={{height:"25%", minWidth:"200px"}}>
          <div className="col d-flex align-self-center ml-3 mr-3 pb-2 pt-2" style={{borderTop:"3px solid #a4a4a4",borderBottom:"3px solid #a4a4a4"}}>
            <div className="col-5 text-center mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>차트번호</span></div>
            <div className="col-7   ml-0 mr-0" style={{fontSize:"14px"}}>{props.selectedPatient.patientid}</div>
          </div>
          <div className="col d-flex align-self-center ml-3 mr-3 pb-2 pt-2" style={{borderTop:"3px solid #a4a4a4",borderBottom:"3px solid #a4a4a4"}}>
            <div className="col-5 text-center mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>이름</span></div>
            <div className="col-7   ml-0 mr-0" style={{fontSize:"14px"}}>{props.selectedPatient.patientname}</div>
          </div>
        </div>

        <div className="d-flex ml-0 mr-0" style={{height:"20%", minWidth:"200px"}}>
          <div className="col d-flex align-self-center ml-3 mr-3 pb-1 pt-1 " style={{borderBottom:"3px solid #a4a4a4"}}>
            <div className="col-5 text-center mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>주민등록번호</span></div>
            <div className="col-7   ml-0 mr-0" style={{fontSize:"14px"}}>{props.selectedPatient.ssn1} - {props.selectedPatient.ssn2}</div>
          </div>
          <div className="col d-flex align-self-center ml-3 mr-3 pb-1 pt-1 " style={{borderBottom:"3px solid #a4a4a4"}}>
            <div className="col-5 text-center mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>나이</span></div>
            <div className="col-7   ml-0 mr-0" style={{fontSize:"14px"}}>{props.selectedPatient.age}세</div>
          </div>
        </div>


        

          {/* <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold", paddingLeft:"15px"}}><span>주민등록 번호</span></div>
          <div className="ml-0 mr-0 row">
            <div className="col ">
              <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.ssn1}</div>
            </div>
            <div className="d-flex align-items-center">-</div>
            <div className="col">
              <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.ssn2}</div>
            </div>
          </div> */}
        

        <div className="d-flex ml-0 mr-0" style={{height:"20%", minWidth:"200px"}}>
          <div className="col d-flex align-self-center ml-3 mr-3 pb-1 pt-1" style={{borderBottom:"3px solid #a4a4a4"}}>
            <div className="col-5 text-center mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>성별</span></div>
            <div className="col-7   ml-0 mr-0" style={{fontSize:"14px"}}>{props.selectedPatient.sex}</div>
          </div>
          <div className="col d-flex align-self-center ml-3 mr-3 pb-1 pt-1" style={{borderBottom:"3px solid #a4a4a4"}}>
            <div className="col-5 text-center mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>전화번호</span></div>
            <div className="col-7   ml-0 mr-0" style={{fontSize:"14px"}}>{props.selectedPatient.phonenumber}</div>
          </div>
        </div>


        <div className="d-flex ml-0 mr-0" style={{height:"20%", minWidth:"200px"}}>
          <div className="col d-flex align-self-center ml-3 mr-3 pb-1 pt-1" style={{borderBottom:"3px solid #a4a4a4"}}>
            <div className="col-5 text-center mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>등록일</span></div>
            <div className="col-7   ml-0 mr-0" style={{fontSize:"14px"}}>{props.selectedPatient.registerday}</div>
          </div>
          <div className="col d-flex align-self-center ml-3 mr-3 pb-1 pt-1" style={{borderBottom:"3px solid #a4a4a4"}}>
            <div className="col-5 text-center mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>최종진료일</span></div>
            <div className="col-7   ml-0 mr-0" style={{fontSize:"14px"}}>{props.selectedPatient.lasttreatment}</div>
          </div>
        </div>

        {/* <div className="row ml-0 mr-0" style={{height:"25%"}}>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>성별</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.sex}</div>
          </div>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>전화번호</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.phonenumber}</div>
          </div>
        </div> */}
        {/* <div className="row ml-0 mr-0" style={{height:"25%"}}>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>등록일</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.registerday}</div>
          </div>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>최종진료일</span></div>
            <div className="text-center pt-1 pb-1 ml-0 mr-0" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}>{props.selectedPatient.lasttreatment}</div>
          </div>
        </div> */}
      </div>
    </>
  );

  } 
  
  export default PatientProfile;