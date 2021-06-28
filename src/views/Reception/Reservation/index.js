import Calendar from "../SearchPatient/Calendar"
import Item from "views/components/Item";
import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";

import {getAllReservationsData} from "views/Reception/BackEnd/index"
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ReservationUpdateModal from "./ReservationUpdateModal";
function Reservation(props){
    const property = ["reservationid","patientid","status","type","reservationdate"]
    const [selectDate,setSelectDate] = useState(new Date().toLocaleDateString());
    const [reservationList, setReservationList] = useState(()=>(getAllReservationsData()))
    const reservationReducer = useSelector((state)=>(state.reservationReducer))
    const [reservationUpdateModalshow, setReservationUpdateModalshow] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState();
    const click = (focusItem) =>{
        setSelectedReservation(focusItem)
    }
     //모달창 닫는 함수
     const closeModal= (modalname) =>{
        // 모달일때 모달종류에 따라 닫아줌
          if(modalname==="RegisterUpdateModal"){
            setReservationUpdateModalshow(false)
          }
        }
    useEffect(()=>{
        if(reservationReducer.length>0){
            const newreservationlist = reservationList.concat(reservationReducer.reservation)
            setReservationList(newreservationlist)
        }
       
    },[reservationReducer])
// 환자 프로필에 변수저장 
const setReservation = (patient)=>{
    if(patient){
     const tmpPatient = {
       patientid:patient.patientid,
       patientname:patient.patientname, 
       ssn1:patient.ssn1, 
       ssn2:patient.ssn2, 
       sex: patient.sex,
       age:patient.age,
       phonenumber: patient.phonenumber, 
       registerday: patient.registerday,
       lasttreatment: patient.lasttreatment
     }
    }
 }
    return(
    <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"50vh", backgroundColor:"white"}}>
        <ReceptionHeader headertitle="예약" iclassName="bi bi-calendar-event " color="#ffcd82">
            <button style={{margin:"0px 10px"}} onClick={()=>{setReservationUpdateModalshow(true)}} className="btn btn-outline-dark btn-sm">예약수정</button>
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
        <Modal backdrop="static" size="lg" show={reservationUpdateModalshow}  onHide={()=>{setReservationUpdateModalshow(false)}}>
<Modal.Header closeButton>
  <Modal.Title>환자검색</Modal.Title>
</Modal.Header>
<Modal.Body><ReservationUpdateModal closeModal={closeModal} selectedReservation={selectedReservation} setReservation={setReservation}/></Modal.Body>
</Modal>
    </div>



    )
}

export default Reservation;