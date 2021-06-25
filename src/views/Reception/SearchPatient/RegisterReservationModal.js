import { useEffect, useState } from "react";
import ReactDatePicker, {} from "react-datepicker";
import Calendar from "./Calendar";
import "./datepickerReservation.css";

const InitTestList = () =>{
    let testlist = [];
    for(var i=0; i<20; i++){
        let test = {testid:i, testname:"test"+i, ischeck:false}
        testlist.push(test);
    }
    return testlist;

}
const InitReservationList = () =>{
    let reservationlist = [];
    
    let initdate1 = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),9,30)
    let initdate2 = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),10,0)
    
        let reservation = {id:1, patientid:1, type:"진료",date:initdate1 }
        let reservation2 = {id:2, patientid:2, type:"검사",date:initdate2 }
        reservationlist.push(reservation);
        reservationlist.push(reservation2); 
     
    return reservationlist;
}

function RegisterReservationModal(props){
    const patient = props.patientList[0];
    //예약 리스트
    const [reservationList, setReservationList] = useState(InitReservationList);
    //선택된 날짜 상태
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),8,0))

    //진료인지 날짜인지 예약 타입상태 -> true이면 진료, false이면 예약
    const [reservationType, setReservationType] = useState(true)
    //예약상태 결정하는 함수
    const handleReservation = (type) =>{
        setReservationType(type)
    }
    //선택된 검사리스트 (초기값으로 DB에서 불러온 처방검사리스트 들어감)
    const [testList,setTestList] = useState(InitTestList);
    //처방된 검사 선택
    const handleTestList = (event, index) =>{
        const modify = testList.map((item,i)=>{
            if(i===index){
                item.ischeck = event.target.checked
            }
            return item;
        })
        setTestList(modify);
    }
    

    //초기화 함수
    useEffect(()=>{
        console.log("this is reservaiton!")
    },[props.patient]) 
    useEffect(()=>{
    },[startDate])
    const getReservationDate= () =>{
        var newDateOptions = {
            month: "2-digit",
            day: "2-digit",
            hour:"2-digit",
            minute:"2-digit"
        }
        const origin = startDate.toLocaleString("en-US",newDateOptions);
        let date = new Date(startDate);
        date.setMinutes(date.getMinutes()+30)
        if(startDate.getTime()){
            
            return origin+" ~ "+date.toLocaleString("en-US",newDateOptions)
        }else{
            return "시간을 선택해 주세요"
        }
       
    }
    //예약 등록함수
    const ResisterReservation=()=>{
        //reservationType이 true가 진료 / false가 검사
        if(reservationType){
            //DB에 해당 patient, startDate로 해당 시간에 진료예약
        }
        else{
            //DB에 해당 patient, startDate, testList로 해당 시간에 검사예약
        }
        //모달 닫기
        props.closeModal("RegisterReservationModal")
    }
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
                <div className="col-6 text-center" style={{margin:"10px",marginTop:"5%", height:"100%"}} >
                    <ReactDatePicker 
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    popperPlacement="bottom" 
                    minTime={new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),8,0)}
                    maxTime={new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),17,30)}
                    excludeTimes={
                        reservationList.map((item)=>{return(
                            item.date
                        )
                        })
                    }
                    inline
                    dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <div className="border text-center" style={{borderRadius:"15px"}}> 
                        예약날짜<br/>{getReservationDate()}
                   </div>
                </div>                
                <div className="col-5" style={{margin:"10px", height:"100%"}}>
                    <div style={{height:"10%"}}>
                        <button onClick={()=>{handleReservation(true)}}  style={{backgroundColor:reservationType? "green":"white", borderRadius:"15px",marginRight:"10px", marginTop:"5px"}} className="btn btn-outline-dark btn-sm border">진료</button>
                        <button onClick={()=>{handleReservation(false)}}  style={{backgroundColor:!reservationType? "green":"white",borderRadius:"15px",marginRight:"10px", marginTop:"5px"}} className="btn btn-outline-dark btn-sm border">검사</button>
                    </div>
                    <div className="col border" style={{overflow:"auto" ,borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        {!reservationType&&
                            testList.map((item,index)=>{return(
                                <div >
                                <input type="checkbox" onChange={(e)=>{handleTestList(e,index)}} value={testList[index].ischeck}/>
                                <label style={{marginLeft:"5px"}}>{item.testid}</label>
                                <label style={{marginLeft:"5px"}}>{item.testname}</label>
                                </div>
                            )})
                        }
                   </div>
                   <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
                        <button className="btn btn-outline-dark btn-sm" onClick={ResisterReservation}>예약등록</button>
                   </div>
                </div>

            </div>
       

                      
        </div>

        )
    }

export default RegisterReservationModal;