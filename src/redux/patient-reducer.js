const initialState = {
  patient: { 
    patientname:"환자이름", 
    ssn1:"-", 
    ssn2:"-", 
    sex: "성별",
    age:"-",
    phonenumber: "-", 
  }
}

//액션 타입 선언
const SET_PATIENT="patient/setPatient";


//액션 생성 함수 선언
export const createSetPatient = (patient) => {
  return {type:SET_PATIENT, patient};
} 

//리듀스 선언
const patientReducer = (state = initialState, action) => {
  if(action.type === SET_PATIENT) {
    return {...state, patient:action.patient};
  } else {
    return state;
  }
}


export default patientReducer;