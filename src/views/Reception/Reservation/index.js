import Calendar from "../SearchPatient/Calendar"
import Item from "views/components/Item";
import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";

import {getAllReservationsData} from "views/Reception/BackEnd/index"
import { useSelector } from "react-redux";
function Reservation(props){
    const property = ["reservationid","patientid","status","type","reservationdate"]
    const [selectDate,setSelectDate] = useState(new Date().toLocaleDateString());
    const [reservationList, setReservationList] = useState(()=>(getAllReservationsData()))
    const reservationReducer = useSelector((state)=>(state.reservationReducer))
    const click = (item) =>{
        console.log("reser click!")
    }
    
    useEffect(()=>{
        if(reservationReducer.length>0){
            const newreservationlist = reservationList.concat(reservationReducer.reservation)
            setReservationList(newreservationlist)
        }
       
    },[reservationReducer])

    return(
    <div className="pl-3 pr-3 pb-3" style={{height:"50vh", backgroundColor:"white"}}>
        <ReceptionHeader headertitle="예약" iclassName="bi bi-calendar-event " color="#ffcd82">
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">예약수정</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">검사접수</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">진료접수</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">예약 및 취소접수</button>
        </ReceptionHeader>
        <Calendar setSelectDate = {(date)=>{setSelectDate(date)}}/>

        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>ID</div>
                <div style={{width:"20%"}}>이름</div>
                <div style={{width:"20%"}}>상태</div>
                <div style={{width:"20%"}}>예약타입</div>
                <div style={{width:"20%"}}>예약시간</div>
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"calc(50vh - 230px)"}} >
                
                 {reservationList&&reservationList.map((item,index)=>{
                     console.log(reservationList)
                     let rdate = item.reservationdate; 
                     if(item.reservationdate instanceof Date){
                         rdate = item.reservationdate.toLocaleDateString()
                     }
                     if(rdate===selectDate){
                         const item2 = {...item}
                         item2["reservationdate"] = item.reservationdate.toLocaleString()
                        return(
                            <div key={index}>
                                    <Item onClick={click} item ={item2} property={property} order={index}/>
                            </div>                         
                            )
                        }
                     })} 
            </div>
        </div>
    </div>
    )
}

export default Reservation;