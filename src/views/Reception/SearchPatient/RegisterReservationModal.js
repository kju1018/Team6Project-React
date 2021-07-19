import { useEffect, useState } from "react";
import ReactDatePicker, {} from "react-datepicker";
import "./datepickerReservation.css";
import { useDispatch } from "react-redux";
import { createSetReservation } from "redux/reservation-reducer";
import { RegisterReservation } from "apis/Reception";

function RegisterReservationModal(props){
    // //예약 리스트
    // const [reservationList, setReservationList] = useState([]);
    //선택된 날짜 상태
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),9,0))

    // //예약된 시간상태
    // const [reservatedTimes,setReservatedTimes] = useState([]); 

    //진료인지 날짜인지 예약 타입상태 -> true이면 진료, false이면 예약
    const [reservationType, setReservationType] = useState(true)
    //예약상태 결정하는 함수
    const handleReservation = (type) =>{
        setReservationType(type)
    }
    const dispatch = useDispatch();
    ////선택된 검사리스트 (초기값으로 DB에서 불러온 처방검사리스트 들어감)
    // const [testList,setTestList] = useState([]);
    // //처방된 검사 선택
    // const handleTestList = (event, index) =>{
    //     const modify = testList.map((item,i)=>{
    //         if(i===index){
    //             item.ischeck = event.target.checked
    //         }
    //         return item;
    //     })
    //     setTestList(modify);
    // }

    //날짜를 넣으면 인데스 나옴
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
    //인덱스를 넣으면 날짜가 나오는 함수
    // const GetTime=(Index)=>{
    //     let num = (Index+18)*5
    //     let hour = num/10
    //     let minute = num%10===5?30:0
    //     const date = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),hour,minute)
    //     return date;
    // }
    useEffect(()=>{
        //예약정보불러오기
        // var reservationlist = getAllReservationsData();
        // setReservationList(reservationlist)
        // var testlist = getAllTestsGroupData(props.selectedPatient.patientid);
        // setTestList(testlist);
         
       //첫번째로 가능한 예약시간을 구하기위해 datepicker의 Time테이블 형식(30분단위)에 맞춰서 해당 날짜의 1차원배열구성
        // let Times=new Array(18);
        //     Times[GetTimeIndex(new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),13,0))] = true;
        //     Times[GetTimeIndex(new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),13,30))] = true;
        //     for(var i=0; i<reservationlist.length; i++){
        //         if(reservationlist[i].reservationdate){
        //             Times[GetTimeIndex(reservationlist[i].reservationdate)] = true;
        //         }
        //     }
         
        

         //첫번째 들어갈 시간 구하기
        //  for(var i=0; i<Times.length; i++){
        //      if(!Times[i]){
        //          setStartDate(GetTime(i))
        //          break;
        //      }
        //      //만약 모든 시간이 차있으면 예외처리
        //      if(i===Times.length-1){
                
        //      }
        //  }

          //예약된 정보를  일,시간,분 3차원배열구성
        //  let excludeTime = new Array(12)
        //  for(var i=0; i<12; i++){
        //      var lastday = new Date(new Date().getFullYear(),i+1,0).getDate();
        //     excludeTime[i] = new Array(lastday)
        //     for(var j=0; j<lastday; j++){
        //         excludeTime[i][j] = new Array();
        //     }
        //  }
        
        //     for(var i=0; i<reservationlist.length; i++){
        //         var month = reservationlist[i].reservationdate.getMonth()+1
        //         var day = reservationlist[i].reservationdate.getDate()
        //         excludeTime[month-1][day-1].push(reservationlist[i].reservationdate)
        //         console.log(month + ","+day+","+reservationlist[i].reservationdate)
        //      }
         
         
        // console.log(excludeTime)
        // setReservatedTimes(excludeTime)  
      
      
    },[])

    //선택된 날짜~ +30분 가져오기
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
    
    //예약 등록함수
    const ResisterReservation=()=>{
        //let newreservation;
            //DB에 해당 patient, startDate로 해당 시간에 진료예약
            RegisterReservation({reservationdate:startDate.getTime(),patientid:props.selectedPatient.patientid,patientname:props.selectedPatient.patientname,status:"대기",type:reservationType?"진료":"검사" }).then((result)=>{
                //redux 저장
                dispatch(createSetReservation(result.data))
                //모달 닫기
                props.closeModal("RegisterReservationModal")
            })
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
                
                <div className="row d-flex justify-content-between text-center  " style={{borderRadius:"15px"}}>
                  
                    <div style={{width:"10%"}}>{props.selectedPatient.patientid}</div>
                    <div style={{width:"10%"}}>{props.selectedPatient.patientname}</div>
                    <div style={{width:"10%"}}>{props.selectedPatient.sex}</div>
                    <div style={{width:"10%"}}>{props.selectedPatient.age}</div>
                    <div style={{width:"35%"}}>{props.selectedPatient.ssn1 + " - " + props.selectedPatient.ssn2}</div>
                    <div style={{width:"25%"}}>{props.selectedPatient.phonenumber}</div>
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
                    // excludeTimes={reservatedTimes.length>1&&reservatedTimes[startDate.getMonth()][startDate.getDate()-1]}
                    inline
                    dateFormat="yyyy-MM-dd hh:mm"
                    />
                    <div className="border text-center" style={{borderRadius:"15px"}}> 
                        예약날짜<br/>{getReservationDate()}
                   </div>
                </div>                
                <div className="col-5 " style={{margin:"10px", height:"80%", padding:"0px" ,marginTop:"5%"  }}>
                    <button onClick={()=>{handleReservation(true)}} style={{backgroundColor:reservationType? "#ffcd82":"white",border:"2px solid #ffcd82",borderRadius:"15px",width:"47%",height:"70%", fontSize:"2em"}} className="  mr-1 ">진료</button>
                        
                        
                    <button onClick={()=>{handleReservation(false)}}  style={{backgroundColor:!reservationType? "#ffcd82":"white",border:"2px solid #ffcd82",borderRadius:"15px",width:"47%",height:"70%", fontSize:"2em"}} className=" ">검사</button>

                        {/* {!reservationType&&
                            testList&&testList.map((item,index)=>{return(
                                <div key={index}>
                                <input type="checkbox" onChange={(e)=>{handleTestList(e,index)}} value={testList[index].ischeck}/>
                                <label style={{marginLeft:"5px"}}>{item.groupcode}</label>
                                <label style={{marginLeft:"5px"}}>{item.groupname}</label>
                                </div>
                            )})
                        } */}
                   
                    <button className="btn btn-outline-dark btn-sm" style={{borderRadius:"15px",  marginTop:"10px", width:"100%", fontSize:"1.5em"}} /*disabled={reservationType===false&&(testList==null || (testList.filter((item)=>(item.ischeck===true)).length<1)) }*/  onClick={ResisterReservation}>예약등록</button>
                   
                </div>

            </div>
       

                      
        </div>

        )
    }

export default RegisterReservationModal;