import { useState } from "react";
import { useForm } from "react-hook-form";
import {UpdatePatient} from "apis/Reception"
function RegisterPatientModal(props){

    const { register, handleSubmit, errors } = useForm();
  
    const onSubmit=(patient)=>{
        patient["patientid"] = props.selectedPatient.patientid
        patient["lasttreatment"] = props.selectedPatient.lasttreatment==="-"?null:props.selectedPatient.lasttreatment
        //등록일은 수정한 날짜로 갱신
        patient["registerday"] = new Date()

        //DB에 저장
        UpdatePatient(patient).then((result)=>{
          patient["registerday"] =  patient["registerday"].toLocaleDateString()
          // 해당 상태 부모로 빼고 모달 닫기
          props.setSelectedPatient(patient)
          props.closeModal("UpdatePatientModal")        
        })
       
    }

    return(
        <>
      <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label>이름 : </label>
        <input className="ml-2" name="patientname" defaultValue={props.selectedPatient.patientname} ref={register({ required: true })} />
        {errors.patientname && <div style={{color:"red"}}>이름을 입력해 주세요</div>}
      </div>

      <div className="mb-2">
      <label>성별 : </label>
      <select className="ml-2" name="sex" ref={register({ required: true })} defaultValue={props.selectedPatient.sex}>
        <option  value="남자">남자</option>
        <option value="여자">여자</option>
      </select>
      </div>

      <div className="mb-2">
      <label>나이 : </label>
      <input className="ml-2" name="age" type="number" defaultValue={props.selectedPatient.age} ref={register({ required: true })} />
      {errors.age && <div style={{color:"red"}}>나이를 입력해 주세요</div>}
      </div>

      <div className="mb-2">
      <label>주민등록번호 : </label>
 <br/>
      <input className="mr-2" name="ssn1" type="number" defaultValue={props.selectedPatient.ssn1}  ref={register({required: true, pattern: /[0-9]{6}/})} />

  
      -
   
      <input className="ml-2" name="ssn2" type="number" defaultValue={props.selectedPatient.ssn2} ref={register({required: true, pattern: /[0-9]{7}/})} />
      {(errors.ssn2?.type === "required" || errors.ssn1?.type === "required")  && <div style={{color:"red"}}>주민번호를 입력해 주세요</div>}
      {(errors.ssn2?.type === "pattern" ||errors.ssn1?.type === "pattern")  && <div style={{color:"red"}}>주민번호 13자리를 입력해 주세요</div>}
      </div>

      <div className="mb-2">
      <label>핸드폰번호 : </label>
      <input className="ml-2" name="phonenumber" type="number" defaultValue={props.selectedPatient.phonenumber} ref={register({ required: true })} />
      {errors.phonenumber && <div style={{color:"red"}}>핸드폰 번호를 입력해 주세요</div>}
      </div>
      <div className="d-flex justify-content-end">
      <input  type="submit" />
      </div>
    </form>
        </div>
        </>
    )
}

export default RegisterPatientModal;