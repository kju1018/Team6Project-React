import { useEffect, useState } from "react";
import ReactDatePicker, {} from "react-datepicker";
import Calendar from "./Calendar";
import "./datepickerReservation.css";
function RegisterReservation(props){
    const patient = props.patientList[0];

    const [startDate, setStartDate] = useState(new Date())

    useEffect(()=>{
        const origin = startDate.toLocaleString();
        let date = new Date(startDate);
        date.setMinutes(date.getMinutes()+30)
        console.log(origin+ "~" +date.toLocaleString())
    },[startDate])
    return(
        <div className="conatainer" style={{height:"60vh"}}>
            <div style={{height:"15%"}}>
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
            </div>
            <div className="row" style={{height:"80%"}}>
                <div className="col-6 text-center" style={{margin:"10px", height:"100%"}} >
                    <ReactDatePicker 
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    popperPlacement="bottom" 
                    minTime={new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),8,0)}
                    maxTime={new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),17,30)}
                    inline
                    dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <div className="border text-center" style={{borderRadius:"15px"}}> 
                        예약날짜 : {startDate.toLocaleString()}
                   </div>
                </div>                
                <div className="col-5" style={{margin:"10px", height:"100%"}}>
                    <div style={{height:"10%"}}>
                        <button  style={{borderRadius:"15px",marginRight:"10px", marginTop:"5px"}} className="btn btn-outline-dark btn-sm border">진료</button>
                        <button  style={{borderRadius:"15px",marginRight:"10px", marginTop:"5px"}} className="btn btn-outline-dark btn-sm border">검사</button>
                    </div>
                    <div className="col border" style={{borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        adsf
                   </div>
                   <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
                        <button className="btn btn-outline-dark btn-sm">예약등록</button>
                   </div>
                </div>

            </div>
       

                      
        </div>

        )
    }

export default RegisterReservation;