import Calendar from "../SearchPatient/Calendar"
import Item from "views/components/Item";
import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";
import {useSelector } from "react-redux";
import { Modal,Spinner } from "react-bootstrap";
import ReservationUpdateModal from "./ReservationUpdateModal";
import DoctorSelectorModal from "../SearchPatient/DoctorSelectorModal";
import { GetReservationList,RemoveReservation } from "apis/Reception";
import moment from 'moment';
import TestSelectorModal from "../SearchPatient/TestSelectorModal";
function Reservation(props){
    const [reservationUpdateModalshow, setReservationUpdateModalshow] = useState(false);
    const [doctorSelectorModalshow, setDoctorSelectorModalshow] = useState(false);


    const property = ["patientid","patientname","type","reservationuidate"]
    const [selectDate,setSelectDate] = useState(new Date().toLocaleDateString());
    const [reservationList, setReservationList] = useState([])
    const reservationReducer = useSelector((state)=>(state.reservationReducer))

    const [selectedReservation, setSelectedReservation] = useState();
    const [testSelectorModalshow, setTestSelectorModalshow] = useState(false);
    const [loading,setLoading] = useState(false);
    const click = (focusItem) =>{
        setSelectedReservation(focusItem)
    }
     //모달창 닫는 함수
     const closeModal= (modalname) =>{
        // 모달일때 모달종류에 따라 닫아줌
          if(modalname==="ReservationUpdateModal"){
            setReservationUpdateModalshow(false)
          }else if(modalname==="TestSelectorModal"){
            setTestSelectorModalshow(false)
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
    //리듀서로 가져온 예약정보를 ui에 추가해줌 + 예약날짜순 정렬
    useEffect(()=>{
        if(reservationReducer.reservation.reservationid){
            const newreservationlist = reservationList.concat(reservationReducer.reservation)         
            newreservationlist.sort((r1,r2)=>{
                return Number(new Date(r1.reservationdate)) - Number(new Date(r2.reservationdate))
            }) 
            setReservationList(newreservationlist)
        }
       
    },[reservationReducer])

    //로딩 스피너 끄고 키는 함수
  const ControlLoading=(bool)=>{
    setLoading(bool)
  }

    //자식인 예약수정 컴포넌트에 넘길 예약수정함수(부모의 예약 리스트를 바꿔야하기에 부모컴포넌트에서 수행해줌) 
const UpdateReservation=(newreservation)=>{
    if(selectedReservation){
        //UI에서 해당 예약을 새로운 예약으로 교체
        const index = reservationList.findIndex((item)=>(item.reservationid===selectedReservation.reservationid))
        let tmplist = [...reservationList]
        if(index>=0){
            tmplist.splice(index,1,newreservation);
        }
        tmplist.sort((r1,r2)=>{
            return Number(new Date(r1.reservationdate)) - Number(new Date(r2.reservationdate))
        }) 
        setReservationList(tmplist)
        setSelectedReservation(null)
    }
    
}

//예약 취소
const CancelReservation=()=>{
    if(selectedReservation){
        //DB변경
        RemoveReservation(selectedReservation.reservationid).then((result)=>{
            //ui변경
            const index = reservationList.findIndex((item)=>(item.reservationid===selectedReservation.reservationid))
            let tmplist = [...reservationList]
            if(index>=0){
                tmplist.splice(index,1);
            }
            tmplist.sort((r1,r2)=>{
                return Number(new Date(r1.reservationdate)) - Number(new Date(r2.reservationdate))
            }) 
            setReservationList(tmplist)

        })
        setSelectedReservation(null)
            
        
    }
    

}

    //검사접수하기
    const ResisterTest = () =>{
      //모달창 open
      setTestSelectorModalshow(true)
    }

  //진료접수시 상태변경함수
  // const modifyReservationList = () =>{
  //   const modify = reservationList.map((item)=>{
        
  //     if(item.reservationid===selectedReservation.reservationid){
  //         item.status="접수완료"
  //     }
  //     return item;      
      
  //   })
  //   //상태변경된 예약 수정
  //   setReservationList(modify)
  // }
    //진료접수하기
    const ResisterTreatment = () =>{
             //모달창 open
             setDoctorSelectorModalshow(true)
    }


    return(
    <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"50vh", backgroundColor:"white"}}>
        <ReceptionHeader headertitle="예약" iclassName="bi bi-calendar-event " color="#ffcd82">
            <button style={{marginRight:"10px"}} disabled={!(selectedReservation)}onClick={()=>{setReservationUpdateModalshow(true)}} className="btn btn-dark btn-sm">예약수정</button>
            <button style={{marginRight:"10px"}} disabled={!(selectedReservation&&selectedReservation.type==="검사" &&selectedReservation.status==="대기" )} onClick={ResisterTest} className="btn btn-dark btn-sm">검사접수</button>
            <button style={{marginRight:"10px"}} disabled={!(selectedReservation&&selectedReservation.type==="진료"&&selectedReservation.status==="대기" )} onClick={ResisterTreatment} className="btn btn-dark btn-sm">진료접수</button>
            <button style={{marginRight:"10px"}} disabled={!(selectedReservation)}onClick={CancelReservation} className="btn btn-dark btn-sm">예약취소</button>
        </ReceptionHeader>
        <Calendar setSelectDate = {(date)=>{setSelectDate(date)}}/>
        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center  " style={{marginTop:"10px",marginBottom:"10px",color:"white", backgroundColor:"#1B296D", paddingTop:"5px",paddingBottom:"5px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>환자ID</div>
                <div style={{width:"20%"}}>이름</div>
                <div style={{width:"20%"}}>예약타입</div>
                <div style={{width:"20%"}}>예약시간</div>
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"calc(50vh - 230px)"}} >
                 {reservationList&&reservationList.map((item,index)=>{
                     
                     
                     let rdate = new Date(item.reservationdate).toLocaleDateString() 
                     const item2 = {...item, reservationuidate:moment(item.reservationdate).format("HH:mm")}
                     if(rdate===selectDate){
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
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}}  closeButton>
        <Modal.Title style={{color:"white"}}>예약수정</Modal.Title>
        </Modal.Header>
        <Modal.Body><ReservationUpdateModal closeModal={closeModal} selectedReservation={selectedReservation} UpdateReservation={UpdateReservation}/></Modal.Body>
        </Modal>
        <Modal  backdrop="static" size="lg" show={testSelectorModalshow} onHide={()=>{setTestSelectorModalshow(false)}}>
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}}  closeButton>
          <Modal.Title style={{color:"white"}}>검사선택</Modal.Title>
          {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}
        </Modal.Header>
        <Modal.Body><TestSelectorModal CancelReservation={CancelReservation} controlLoading={ControlLoading} closeModal={closeModal} selectedPatient={selectedReservation}/></Modal.Body>
      </Modal>
        <Modal  backdrop="static" show={doctorSelectorModalshow} onHide={()=>{setDoctorSelectorModalshow(false)}}>
        <Modal.Header style={{backgroundColor:"rgb(27, 41, 109)"}}  closeButton>
          <Modal.Title style={{color:"white"}}>의사선택</Modal.Title>
          {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}
        </Modal.Header>
        <Modal.Body><DoctorSelectorModal CancelReservation={CancelReservation} controlLoading={ControlLoading} closeModal={closeModal} selectedPatient={selectedReservation}/></Modal.Body>
      </Modal>
    </div>
    )
}

export default Reservation;