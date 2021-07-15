import { RegisterPatient } from "apis/Reception";
import { useForm } from "react-hook-form";
function RegisterPatientModal(props){
    const { register, handleSubmit,  errors } = useForm();
  
    const onSubmit=(patient)=>{
        //상태가 아닌 고정값 지정
        patient["registerday"] = new Date()
        patient["codenumber"]=1
        patient["enabled"]=1
        //DB에 저장
       RegisterPatient(patient).then((result)=>{
        patient["patientid"] = result.data
        patient["lasttreatment"] = "-"
        patient["registerday"] = patient["registerday"].toLocaleDateString()
        // 해당 상태 부모로 빼고 모달 닫기
        props.setSelectedPatient(patient)
        props.closeModal("RegisterPatientModal")
        })
       
    }

    return(
        <>
      <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label>이름 : </label>
        <input className="ml-2" name="patientname" ref={register({ required: true })} />
        {errors.patientname && <div style={{color:"red"}}>이름을 입력해 주세요</div>}
      </div>

      <div className="mb-2">
      <label>성별 : </label>
      <select className="ml-2" name="sex" ref={register({ required: true })}>
        <option value="남자">남자</option>
        <option value="여자">여자</option>
      </select>
      </div>

      <div className="mb-2">
      <label>나이 : </label>
      <input className="ml-2" name="age" type="number" ref={register({ required: true })} />
      {errors.age && <div style={{color:"red"}}>나이를 입력해 주세요</div>}
      </div>

      <div className="mb-2">
      <label>주민등록번호 : </label>
 <br/>
      <input className="mr-2" name="ssn1" type="number" ref={register({required: true, pattern: /[0-9]{6}/})} />

  
      -
   
      <input className="ml-2" name="ssn2" type="number" ref={register({required: true, pattern: /[0-9]{7}/})} />
      {(errors.ssn2?.type === "required" || errors.ssn1?.type === "required")  && <div style={{color:"red"}}>주민번호를 입력해 주세요</div>}
      {(errors.ssn2?.type === "pattern" ||errors.ssn1?.type === "pattern")  && <div style={{color:"red"}}>주민번호 13자리를 입력해 주세요</div>}
      </div>

      <div className="mb-2">
      <label>핸드폰번호 : </label>
      <input className="ml-2" name="phonenumber" type="number" ref={register({ required: true })} />
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