import { useState } from "react";
import Item from "views/components/Item";
import PatientProfile from "../components/PatientProfile";
function RegisterPatientModal(props){

    const [patient, setPatient] = useState({name:"",age:"",ssn1:"",ssn2:"",sex:"",phone:""});
    const Resister=(event)=>{
        console.log(patient)
        //DB에 저장
        props.setSelectedPatient(patient,"RegisterPatientModal")
        props.closeModal("RegisterPatientModal")
    }

    const onChangeHandle=(event)=>{
        setPatient({
            ...patient,
            [event.target.name] : event.target.value
        })
    }
    return(
        <>
      <div className="overflow-auto" style={{height:"calc(100% - 50px)", overflowX:"auto"}}>
        <div className="d-flex ml-0 mr-0" style={{height:"33.3%", minWidth:"200px"}}>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>이름</span></div>
            <input onChange={onChangeHandle} value={patient.name} name="name" className="text-center pt-1 pb-1 ml-0 mr-0" style={{outline:"none",boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}/>
          </div>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>나이</span></div>
            <input onChange={onChangeHandle} value={patient.age} name="age" className="text-center pt-1 pb-1 ml-0 mr-0" style={{outline:"none",boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}/>세
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center" style={{height:"33.3%"}}>
          <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold", paddingLeft:"15px"}}><span>주민등록 번호</span></div>
          <div className="ml-0 mr-0 row">
            <div className="col ">
              <input onChange={onChangeHandle} value={patient.ssn1} name="ssn1" className="text-center pt-1 pb-1 ml-0 mr-0" style={{outline:"none",boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}/>
            </div>
            <div className="d-flex align-items-center">-</div>
            <div className="col">
              <input onChange={onChangeHandle} value={patient.ssn2} name="ssn2" className="text-center pt-1 pb-1 ml-0 mr-0" style={{outline:"none",boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}/>
            </div>
          </div>
        </div>
        <div className="row ml-0 mr-0" style={{height:"33.3%"}}>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>성별</span></div>
            <input onChange={onChangeHandle} value={patient.sex} name="sex" className="text-center pt-1 pb-1 ml-0 mr-0" style={{outline:"none",boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}/>
          </div>
          <div className="col d-flex flex-column justify-content-center">
            <div className="mt-2 mb-1" style={{fontSize:"15px", fontWeight:"bold"}}><span>전화번호</span></div>
            <input onChange={onChangeHandle} value={patient.phone} name="phone" className="text-center pt-1 pb-1 ml-0 mr-0" style={{outline:"none",boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"10px", fontSize:"14px"}}/>
          </div>
        </div>
      </div>
        <div className="d-flex justify-content-end mt-2">
            <button onClick={Resister} className="btn btn-outline-dark btn-sm">등록</button>
        </div>
        </>
    )
}

export default RegisterPatientModal;