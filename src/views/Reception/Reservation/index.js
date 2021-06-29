import Calendar from "../SearchPatient/Calendar"
import Item from "views/components/Item";
import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";
import {getAllReservationsData, cancelReservationData, ReceptionTest} from "views/Reception/BackEnd/index"
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ReservationUpdateModal from "./ReservationUpdateModal";
import { createSetTestReception } from "redux/reception-reducer";
import DoctorSelectorModal from "../SearchPatient/DoctorSelectorModal";
function Reservation(props){
    const [reservationUpdateModalshow, setReservationUpdateModalshow] = useState(false);
    const [doctorSelectorModalshow, setDoctorSelectorModalshow] = useState(false);


    const property = ["reservationid","patientid","status","type","reservationdate"]
    const [selectDate,setSelectDate] = useState(new Date().toLocaleDateString());
    const [reservationList, setReservationList] = useState([])
    const reservationReducer = useSelector((state)=>(state.reservationReducer))

    const [selectedReservation, setSelectedReservation] = useState();
    const [updatedReservation,setUpdatedReservation] = useState(null);
    const click = (focusItem) =>{
        setSelectedReservation(focusItem)
    }
    const dispatch = useDispatch();
     //모달창 닫는 함수
     const closeModal= (modalname) =>{
        // 모달일때 모달종류에 따라 닫아줌
          if(modalname==="ReservationUpdateModal"){
            setReservationUpdateModalshow(false)
          }else if(modalname==="DoctorSelectorModal"){
                setDoctorSelectorModalshow(false)
            }
        }

    useEffect(()=>{
       var reservationlist = getAllReservationsData();
        setReservationList(reservationlist)
    },[])

    useEffect(()=>{
        if(reservationReducer){
            const newreservationlist = reservationList.concat(reservationReducer.reservation)
            setReservationList(newreservationlist)
        }
       
    },[reservationReducer])

/////////////////////////////////////////////////////////////////////////////////////
//이부분 수정해야함! 수정된 예약이 목록에서 안바뀜!!
useEffect(()=>{
    // if(updatedReservation){
    //     const modify = reservationList.map((item)=>{
    //         if(item.reservationid===updatedReservation.reservationid){
    //             item = updatedReservation
    //         }
    //         return item;      
            
    //     })
    //      setReservationList(modify)
    
    // }
    
},[updatedReservation])
// 수정된 예약을 목록에 추가 
const setReservation = (reservation)=>{
   // setUpdatedReservation(reservation)     
}

const CancelReservation=()=>{

    // //DB변경
    // cancelReservationData(selectedReservation.reservationid)
    
    // //ui변경
    // const modify = reservationList.map((item)=>{
    //     if(item.reservationid===selectedReservation.reservationid){
    //         item.status="취소"
    //     }
    //     return item;      
        
    // })
    //  setReservationList(modify)

}

//////////////////////////////////////////////////////////////////////

    //검사접수하기
    const ResisterTest = () =>{
        if(selectedReservation.type==="검사"){
            //DB에 검사 생성
            const testreception=ReceptionTest(selectedReservation.patientid,selectedReservation.testList)
            //해당 예약의 상태변경
            const modify = reservationList.map((item)=>{
                if(item.reservationid===selectedReservation.reservationid){
                    item.status="접수완료"
                }
                return item;      
                
            })
             setReservationList(modify)
            //redux에 접수된 검사넘기기
            dispatch(createSetTestReception(testreception))
        }
        
    }

    return(
    <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"50vh", backgroundColor:"white"}}>
        <ReceptionHeader headertitle="예약" iclassName="bi bi-calendar-event " color="#ffcd82">
            <button style={{margin:"0px 10px"}} onClick={()=>{setReservationUpdateModalshow(true)}} className="btn btn-outline-dark btn-sm">예약수정</button>
            <button style={{margin:"0px 10px"}} onClick={ResisterTest} className="btn btn-outline-dark btn-sm">검사접수</button>
            <button style={{margin:"0px 10px"}} onClick={()=>{setDoctorSelectorModalshow(true)}} className="btn btn-outline-dark btn-sm">진료접수</button>
            <button style={{margin:"0px 10px"}} onClick={CancelReservation} className="btn btn-outline-dark btn-sm">예약 및 취소접수</button>
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
                         item2["rdate"] = item.reservationdate
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
        <Modal.Title>예약수정</Modal.Title>
        </Modal.Header>
        <Modal.Body><ReservationUpdateModal closeModal={closeModal} selectedReservation={selectedReservation} setReservation={setReservation}/></Modal.Body>
        </Modal>

        <Modal  backdrop="static" show={doctorSelectorModalshow} onHide={()=>{setDoctorSelectorModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>의사선택</Modal.Title>
        </Modal.Header>
        <Modal.Body><DoctorSelectorModal closeModal={closeModal} selectedPatient={selectedReservation}/></Modal.Body>
      </Modal>
    </div>
    )
}

export default Reservation;