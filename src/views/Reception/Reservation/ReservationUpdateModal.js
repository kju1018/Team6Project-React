import { useEffect, useState } from "react";
import ReactDatePicker, {} from "react-datepicker";
import {getAllReservationsData, getAllTestsGroupData,  getPatientData,updateReservationData, getCheckedTestsGroupData} from "views/Reception/BackEnd/index"


function ReservationUpdateModal(props){
    //예약 리스트
    const [reservationList, setReservationList] = useState([]);
    //선택된 날짜 상태
    const [startDate, setStartDate] = useState(new Date())

    //진료인지 날짜인지 예약 타입상태
    const [reservationType, setReservationType] = useState()
    //해당 patientid에 해당하는 환자정보
    const [patient, setPatient] = useState();
    
    //예약상태 결정하는 함수
    const handleReservation = (type) =>{
        setReservationType(type)
    }
    //선택된 검사리스트
    const [testList,setTestList] = useState(()=>(getCheckedTestsGroupData(props.selectedReservation.patientid,props.selectedReservation.reservationid)));
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
    //선택한 예약환자가 바뀔때마다 처방검사 목록 불러오기
    useEffect(()=>{
        setStartDate(props.selectedReservation.rdate)
        setReservationType(props.selectedReservation.type)
        var testlist = getCheckedTestsGroupData(props.selectedReservation.patientid,props.selectedReservation.reservationid)
        setTestList(testlist)
    },[props.selectedReservation])

    //처음 한번 예약목록 불러오기
    useEffect(()=>{
        var reservationlist = getAllReservationsData();
        var patient = getPatientData(props.selectedReservation.patientid)
        setReservationList(reservationlist);
        setPatient(patient)
    },[])

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
    //예약 수정함수
    const ResisterReservation=()=>{
        let newreservation;
        //reservationType이 true가 진료 / false가 검사
        if(reservationType==="진료"){
            //DB에 해당 patient, startDate로 해당 시간에 진료예약
            newreservation = {reservationid:props.selectedReservation.reservationid,reservationdate:startDate
            ,patientid:props.selectedReservation.patientid,status:"대기",type:"진료" }
            updateReservationData(newreservation)
        }
        else{
            //DB에 해당 patient, startDate, testList로 해당 시간에 검사예약
            const checkedtestlist = testList.filter((test)=>(test.ischeck===true))
            newreservation = {reservationid:props.selectedReservation.reservationid,reservationdate:startDate
                ,patientid:props.selectedReservation.patientid,status:"대기",type:"검사" }
                updateReservationData(newreservation, checkedtestlist)
        }
        props.setReservation(newreservation)
        //모달 닫기
        props.closeModal("ReservationUpdateModal")
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
                  
                    <div style={{width:"10%"}}>{patient&&patient.patientid}</div>
                    <div style={{width:"10%"}}>{patient&&patient.patientname}</div>
                    <div style={{width:"10%"}}>{patient&&patient.sex}</div>
                    <div style={{width:"10%"}}>{patient&&patient.age}</div>
                    <div style={{width:"35%"}}>{patient&&patient.ssn1 + " - " + patient.ssn2}</div>
                    <div style={{width:"25%"}}>{patient&&patient.phonenumber}</div>
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
                            item.reservationdate
                        )
                        })
                    }
                    inline
                    dateFormat="MMMM d, yyyy h:mm"
                    />
                    <div className="border text-center" style={{borderRadius:"15px"}}> 
                        예약날짜<br/>{getReservationDate()}
                   </div>
                </div>                
                <div className="col-5" style={{margin:"10px", height:"100%"}}>
                    <div style={{height:"10%"}}>
                        <button onClick={()=>{handleReservation(true)}}  style={{backgroundColor:reservationType==="진료"? "green":"white", borderRadius:"15px",marginRight:"10px", marginTop:"5px"}} className="btn btn-outline-dark btn-sm border">진료</button>
                        <button onClick={()=>{handleReservation(false)}}  style={{backgroundColor:reservationType==="검사"? "green":"white",borderRadius:"15px",marginRight:"10px", marginTop:"5px"}} className="btn btn-outline-dark btn-sm border">검사</button>
                    </div>
                    <div className="col border" style={{overflow:"auto" ,borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        {!reservationType&&
                            testList&&testList.map((item,index)=>{return(
                                <div key={index}>
                                <input type="checkbox" onChange={(e)=>{handleTestList(e,index)}} value={testList[index].ischeck}/>
                                <label style={{marginLeft:"5px"}}>{item.groupcode}</label>
                                <label style={{marginLeft:"5px"}}>{item.groupname}</label>
                                </div>
                            )})
                        }
                   </div>
                   <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
                        <button className="btn btn-outline-dark btn-sm" onClick={ResisterReservation}>예약수정</button>
                   </div>
                </div>

            </div>
       

                      
        </div>

        )
    }

export default ReservationUpdateModal;