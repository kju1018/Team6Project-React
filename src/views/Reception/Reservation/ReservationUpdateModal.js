import { useEffect, useState } from "react";
import ReactDatePicker, {} from "react-datepicker";
import "../SearchPatient/datepickerReservation.css";
import {getPatientData,getAllReservationsData, getAllTestsGroupData, insertReservationData} from "views/Reception/BackEnd/index"
import { useDispatch } from "react-redux";
import { createSetReservation } from "redux/reservation-reducer";
import TestList from "views/Treatment/TestList";
import { UpdateReservation } from "apis/Reception";


function UpdateReservationModal(props){
    //예약 리스트
    const [reservationList, setReservationList] = useState([]);
    //선택된 날짜 상태
    const [startDate, setStartDate] = useState(new Date())

    //예약된 시간상태
    const [reservatedTimes,setReservatedTimes] = useState([]); 

    //진료인지 날짜인지 예약 타입상태 -> true이면 진료, false이면 예약
    const [reservationType, setReservationType] = useState(true)
    //예약상태 결정하는 함수
    const handleReservation = (type) =>{
        setReservationType(type)
    }
    const dispatch = useDispatch();
    //선택된 검사리스트 (초기값으로 DB에서 불러온 처방검사리스트 들어감)
    const [testList,setTestList] = useState([]);
    //선택된 환자
    const [patient, setPatient] = useState();


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

    // const GetTimeIndex=(date)=>{
    //     let hour = date.getHours()*10
    //     let minute = date.getMinutes()
    //     if(minute===0){
    //         minute = 0;
    //     }else if(minute===30){
    //         minute = 5;
    //     }
    //     const Index = (hour+minute)/5-18
    //     return Index
    // }
    // const GetTime=(Index)=>{
    //     let num = (Index+18)*5
    //     let hour = num/10
    //     let minute = num%10===5?30:0
    //     const date = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),hour,minute)
    //     return date;
    // }
    // useEffect(()=>{
    //     if(props.selectedReservation){
    //         const Patient = getPatientData(props.selectedReservation.patientid)
    //         setPatient(Patient)
    //     }
        
    // },[props.selectedReservation])
    useEffect(()=>{
        // var reservationlist = getAllReservationsData();
        // setReservationList(reservationlist)
        var testlist = getAllTestsGroupData(props.selectedReservation.patientid);
        setTestList(testlist);
        //선택된 예약정보 가져오기 타입, 시간
        setReservationType(props.selectedReservation.type==="진료"?true:false)
        setStartDate(new Date(props.selectedReservation.reservationdate))
        //console.log(GetTime(GetTimeIndex(new Date(new Date().getFullYear(),new Date().getMonth(),29,15,30))))
        //  let Times=new Array(18);
        //     Times[GetTimeIndex(new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),13,0))] = true;
        //     Times[GetTimeIndex(new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),13,30))] = true;
        //     for(var i=0; i<reservationlist.length; i++){
        //         if(reservationlist[i].reservationdate){
        //             Times[GetTimeIndex(reservationlist[i].reservationdate)] = true;
        //         }
        //     }
         
        
            //처음 들어갈시간 넣기
        //  setStartDate(props.selectedReservation.rdate);

        //  let excludeTime = new Array(12)
        //  for(var i=0; i<12; i++){
        //      var lastday = new Date(new Date().getFullYear(),i+1,0).getDate();
        //     excludeTime[i] = new Array(lastday)
        //     for(var j=0; j<lastday; j++){
        //         excludeTime[i][j] = new Array();
        //     }
        //  }
         //exclude에 들어갈 월별 시간 구하기
        
        //     for(var i=0; i<reservationlist.length; i++){
        //         //수정된 예약의 시간은 다시선택할수있게함
        //         if(reservationlist[i].reservationid===props.selectedReservation.reservationid){
        //             continue;
        //         }
        //         var month = reservationlist[i].reservationdate.getMonth()+1
        //         var day = reservationlist[i].reservationdate.getDate()
        //         excludeTime[month-1][day-1].push(reservationlist[i].reservationdate)
        //         console.log(month + ","+day+","+reservationlist[i].reservationdate)
        //      }
         
         
        // console.log(excludeTime)
        // setReservatedTimes(excludeTime)  
      
      
    },[])

    useEffect(()=>{
        console.log(startDate)
    },[startDate])
    const getReservationDate= () =>{
        var newDateOptions = {
            month: "2-digit",
            day: "2-digit",
            hour:"2-digit",
            minute:"2-digit"
        }
        const origin = startDate.toLocaleString("ko-kr",newDateOptions);
        let date = new Date(startDate);
        date.setMinutes(date.getMinutes()+30)
        if(startDate.getTime()){
            
            return origin+" ~ "+date.toLocaleString("ko-kr",newDateOptions)
        }else{
            return "시간을 선택해 주세요"
        }
       
    }
    
    //예약 수정함수
    const UpdateReservationClickBtn=()=>{
        let newreservation;
        //reservationType이 true가 진료 / false가 검사
       
            newreservation = {...props.selectedReservation,reservationdate:startDate.getTime(),type:reservationType?"진료":"검사"};
            //DB에 새로운 예약정보로 업데이트 
            UpdateReservation(newreservation).then((result)=>{
                //부모함수 불러서 ui변경
                props.UpdateReservation(newreservation)
                //모달 닫기
                props.closeModal("ReservationUpdateModal")
            })
           
        
      
            //DB에 해당 patient, startDate, testList로 해당 시간에 검사예약
            // const checkedtestlist = testList.filter((test)=>(test.ischeck===true))
            //이 안에는 검사리스트도 같이 있음
            // newreservation = UpdateReservation({reservationdate:startDate,patientid:props.selectedPatient.patientid,status:"대기",type:"검사" }, checkedtestlist)
        
 
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
                    <div style={{width:"35%"}}>{patient&&patient.ssn1 + " - " + patient&&patient.ssn2}</div>
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
                    minDate={new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())}
                    minTime={new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),9,0)}
                    maxTime={new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),17,30)}
                    //excludeTimes={reservatedTimes.length>1&&reservatedTimes[startDate.getMonth()][startDate.getDate()-1]}
                    inline
                    dateFormat="yyyy-MM-dd hh:mm"
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
                        <button className="btn btn-outline-dark btn-sm" onClick={UpdateReservationClickBtn}>예약수정</button>
                   </div>
                </div>

            </div>
       

                      
        </div>

        )
    }

export default UpdateReservationModal;