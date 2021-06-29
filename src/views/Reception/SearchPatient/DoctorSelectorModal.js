import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSetTreatmentReception } from "redux/reception-reducer";
import { getAllDoctorData,ReceptionTreatment,isReceptionTreatment} from "views/Reception/BackEnd/index"

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
        var doctorlist = getAllDoctorData();
        setDoctorList(doctorlist);
        //진료접수 가능한지 여부 체크
        setDisable(isReceptionTreatment(props.selectedPatient.patientid))
    },[])
    
   

   //진료접수
   const ResisterTreatment = () =>{
    //DB에 진료생성
    const treatmentreception=ReceptionTreatment(props.selectedPatient.patientid,selectedDoctor.userid)
    const treatmentreceptionredux = {selectedDoctor,...treatmentreception}
    if(props.modifyReservationList){
        console.log("hihi")
        props.modifyReservationList()
    }
    //redux에 접수된 진료넘기기
    dispatch(createSetTreatmentReception(treatmentreceptionredux))

    props.closeModal("DoctorSelectorModal")
}

    return(
    <div className="conatainer" style={{height:"400px"}}>
      <div className="col border" style={{overflow:"auto" ,borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        {doctorList&&doctorList.map((item,index)=>{return(
                                <div key={index}>
                                <input type="radio" onChange={(e)=>{handleInputChange(e,item)}} checked={selectedDoctor&&item.userid===selectedDoctor.userid} value={item.userid}/>
                                <label style={{marginLeft:"5px"}}>{item.userid}</label>
                                <label style={{marginLeft:"5px"}}>{item.username}</label>
                                </div>
                            )})
                        }
        </div>
        <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
            <button disabled={props.selectedPatient&&!isReceptionTreatment(props.selectedPatient.patientid)} className="btn btn-outline-dark btn-sm" onClick={ResisterTreatment}>진료접수</button>
        </div>
    </div>
    )
}

export default DoctorSelectorModal;