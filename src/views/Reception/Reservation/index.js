import Calendar from "../SearchPatient/Calendar"
import Item from "views/components/Item";
import { useEffect, useState } from "react";

function Reservation(props){
    const property = ["id","name","rstate","reservationtype","registerday"]
    const [selectDate,setSelectDate] = useState();
    useEffect(()=>{
        console.log("adsf")
        console.log(selectDate.toLocaleDateString());
    },[selectDate])
    return(
    <div className="d-flex flex-column " style={{height:"624px"}}>
        예약
        <Calendar setSelectDate = {(date)=>{setSelectDate(date)}}/>

        <div className="d-flex justify-content-end" style={{marginTop:"10px"}}>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">예약수정</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">검사접수</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">진료접수</button>
            <button style={{margin:"0px 10px"}} className="btn btn-outline-dark btn-sm">예약 및 취소접수</button>
        </div>
        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>ID</div>
                <div style={{width:"20%"}}>이름</div>
                <div style={{width:"20%"}}>상태</div>
                <div style={{width:"20%"}}>예약타입</div>
                <div style={{width:"20%"}}>예약시간</div>
        
        
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"400px"}} >
               
                 {props.patientList&&props.patientList.map((item,index)=>{
                     if(item.registerday ===selectDate.toLocaleDateString()){
                        return(
                            <div key={index}>
                                    <Item item ={item} property={property} order={index}/>
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