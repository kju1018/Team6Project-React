import Calendar from "../SearchPatient/Calendar"
import Item from "views/components/Item";
import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";

function Reservation(props){
    const property = ["id","name","rstate","reservationtype","registerday"]
    const [selectDate,setSelectDate] = useState(new Date().toLocaleDateString());
    useEffect(()=>{
        console.log(selectDate);
    },[selectDate])
    const click = (item) =>{
        console.log("reser click!")
    }
    return(
    <div className="pl-3 pr-3 pb-3" style={{height:"554px", backgroundColor:"white"}}>
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
            <div className="overflow-auto  justify-content-center" style={{height:"350px"}} >
               
                 {props.patientList&&props.patientList.map((item,index)=>{
                     if(item.registerday ===selectDate){

                        return(
                            <div key={index}>
                                    <Item onClick={click} item ={item} property={property} order={index}/>
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