import { GetUsersData } from "apis/Reception";
import { sendRedisMessage } from "apis/Redis";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSetTreatmentReception } from "redux/reception-reducer";
import {isReceptionTreatment} from "views/Reception/BackEnd/index"
import { ReceptionTreatment} from "apis/Reception";
import moment from 'moment';
function DoctorSelectorModal(props){
    //의사리스트
    const [doctorList,setDoctorList] = useState([]);
    //의사 선택
    const [selectedDoctor, setselectedDoctor] = useState();
    const handleInputChange = (event,doctor) => {
      setselectedDoctor(doctor);
    };
    const dispatch = useDispatch();
    // 진료접수 가능한지 여부
    const[disable,setDisable]  = useState(false)
    //처음 컴포넌트 시작시 의사 목록 불러오기
    useEffect(()=>{
        props.controlLoading(true);
        GetUsersData("의사").then((result)=>{
            setDoctorList(result.data);
            //진료접수 가능한지 여부 체크
            //setDisable(isReceptionTreatment(props.selectedPatient.patientid))
            props.controlLoading(false);
        })
    },[])
    
   

   //진료접수
   const ResisterTreatment = () =>{
    let treatmentdate = new Date().getTime()
    const newTreatment = {memo:"",treatmentdate:treatmentdate,patientid:props.selectedPatient.patientid,userid:selectedDoctor.userid,status:"진료 대기" }
    //DB에 진료생성
    ReceptionTreatment(newTreatment).then((result)=>{
       console.log(moment(treatmentdate).format("HH:mm"));
        //redux에 접수된 진료넘기기
        //dispatch(createSetTreatmentReception(result.data))
        //실시간으로 데이터 넘기기
        sendRedisMessage("/reception","treatment")
        props.closeModal("DoctorSelectorModal")
    })
   
    // if(props.modifyReservationList){
    //     props.modifyReservationList()
    // }
    

}

    return(
    <div className="conatainer" style={{height:"400px"}}>
      <div className="col border" style={{overflow:"auto" ,borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        {doctorList&&doctorList.map((item,index)=>{return(
                                <div key={index}>
                                <input type="radio" onChange={(e)=>{handleInputChange(e,item)}} checked={selectedDoctor&&item.userid===selectedDoctor.userid} value={item.userid}/>
                                <label style={{marginLeft:"5px"}}>{item.userid}</label>
                                <label style={{marginLeft:"5px"}}>{item.username}</label>
                                <label style={{marginLeft:"5px"}}>{item.userroom}</label>
                                </div>
                            )})
                        }
        </div>
        <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
            <button disabled={selectedDoctor?false:true} className="btn btn-outline-dark btn-sm" onClick={ResisterTreatment}>진료접수</button>
        </div>
    </div>
    )
}

export default DoctorSelectorModal;