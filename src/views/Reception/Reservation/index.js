import Calendar from "../SearchPatient/Calendar"
import Item from "views/components/Item";
import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";
import { ReceptionTest,cancelReservationData} from "views/Reception/BackEnd/index"
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ReservationUpdateModal from "./ReservationUpdateModal";
import { createSetTestReception } from "redux/reception-reducer";
import DoctorSelectorModal from "../SearchPatient/DoctorSelectorModal";
import { GetReservationList,RemoveReservation } from "apis/Reception";
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
    //예약정보가져옴
    useEffect(()=>{
      GetReservationList().then((result)=>{
        setReservationList(result.data)
       });
    },[])
    //리듀서로 가져온 예약정보를 ui에 추가해줌
    useEffect(()=>{
        if(reservationReducer.reservation.reservationid){
            const newreservationlist = reservationList.concat(reservationReducer.reservation)          
            setReservationList(newreservationlist)
        }
       
    },[reservationReducer])

    

    //자식인 예약수정 컴포넌트에 넘길 예약수정함수(부모의 예약 리스트를 바꿔야하기에 부모컴포넌트에서 수행해줌) 
const UpdateReservation=(newreservation)=>{
    if(selectedReservation){
        //UI에서 해당 예약을 새로운 예약으로 교체
        const index = reservationList.findIndex((item)=>(item.reservationid===selectedReservation.reservationid))
        let tmplist = [...reservationList]
        if(index>=0){
            tmplist.splice(index,1,newreservation);
        }
        setReservationList(tmplist)
    }
    
}

//예약 취소
const CancelReservation=()=>{
    if(selectedReservation){
        console.log(selectedReservation.reservationid)
        //DB변경
        RemoveReservation(selectedReservation.reservationid).then((result)=>{
            //ui변경
            const index = reservationList.findIndex((item)=>(item.reservationid===selectedReservation.reservationid))
            let tmplist = [...reservationList]
            if(index>=0){
                tmplist.splice(index,1);
            }
            setReservationList(tmplist)
        })
            
        
    }
    

}

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

  //진료접수시 상태변경함수
  const modifyReservationList = () =>{
    const modify = reservationList.map((item)=>{
        
      if(item.reservationid===selectedReservation.reservationid){
          item.status="접수완료"
      }
      return item;      
      
    })
    //상태변경된 예약 수정
    setReservationList(modify)
  }
    //진료접수하기
    const ResisterTreatment = () =>{
             //모달창 open
             setDoctorSelectorModalshow(true)
    }


    return(
    <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"50vh", backgroundColor:"white"}}>
        <ReceptionHeader headertitle="예약" iclassName="bi bi-calendar-event " color="#ffcd82">
            <button style={{margin:"0px 10px"}} disabled={!(selectedReservation)}onClick={()=>{setReservationUpdateModalshow(true)}} className="btn btn-outline-dark btn-sm">예약수정</button>
            <button style={{margin:"0px 10px"}} disabled={!(selectedReservation&&selectedReservation.type==="검사" &&selectedReservation.status==="대기" )} onClick={ResisterTest} className="btn btn-outline-dark btn-sm">검사접수</button>
            <button style={{margin:"0px 10px"}} disabled={!(selectedReservation&&selectedReservation.type==="진료"&&selectedReservation.status==="대기" )} onClick={ResisterTreatment} className="btn btn-outline-dark btn-sm">진료접수</button>
            <button style={{margin:"0px 10px"}} disabled={!(selectedReservation)}onClick={CancelReservation} className="btn btn-outline-dark btn-sm">예약취소</button>
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
                     
                     let rdate = new Date(item.reservationdate).toLocaleDateString() 
                     if(rdate===selectDate){
                        return(
                            <div key={index}>
                                    <Item onClick={click} item ={item} property={property} order={index}/>
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
        <Modal.Body><ReservationUpdateModal closeModal={closeModal} selectedReservation={selectedReservation} UpdateReservation={UpdateReservation}/></Modal.Body>
        </Modal>

        <Modal  backdrop="static" show={doctorSelectorModalshow} onHide={()=>{setDoctorSelectorModalshow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>의사선택</Modal.Title>
        </Modal.Header>
        <Modal.Body><DoctorSelectorModal closeModal={closeModal} modifyReservationList={modifyReservationList} selectedPatient={selectedReservation}/></Modal.Body>
      </Modal>
    </div>
    )
}

export default Reservation;