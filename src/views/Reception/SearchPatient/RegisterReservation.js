import Calendar from "./Calendar";

function RegisterReservation(props){
    const patient = props.patientList[0];
    return(
        <div className="conatainer" style={{height:"400px"}}>
               <div className="row d-flex justify-content-between text-center border " style={{borderRadius:"15px"}}>
                    <div style={{width:"10%"}}>ID</div>
                    <div style={{width:"10%"}}>이름</div>
                    <div style={{width:"10%"}}>성별</div>
                    <div style={{width:"10%"}}>나이</div>
                    <div style={{width:"35%"}}>주민번호</div>
                    <div style={{width:"25%"}}>Phone</div>
                </div>
                <div className="row d-flex justify-content-between text-center  " style={{borderRadius:"15px",width:"100%",marginLeft:"5px"}}>
                    <div style={{width:"10%"}}>{patient.id}</div>
                    <div style={{width:"10%"}}>{patient.name}</div>
                    <div style={{width:"10%"}}>{patient.sex===0?"남자":"여자"}</div>
                    <div style={{width:"10%"}}>{patient.age}</div>
                    <div style={{width:"35%"}}>{patient.ssn}</div>
                    <div style={{width:"25%"}}>{patient.phone}</div>
                </div>
                <div style={{marginTop:"10px"}} >
                    <span style={{ padding:"3px"}}>예약종류</span><br/>
                    <button  style={{borderRadius:"15px",marginRight:"10px", marginTop:"5px"}} className="btn btn-outline-dark btn-sm border">진료</button>
                    <button  style={{borderRadius:"15px",marginRight:"10px", marginTop:"5px"}} className="btn btn-outline-dark btn-sm border">검사</button>
                </div>
                <Calendar month={2}/>
                      
        </div>

        )
    }

export default RegisterReservation;