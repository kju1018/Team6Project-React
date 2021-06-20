const initialState = {
  treatment: { 
  }
}

//액션 타입 선언
const SET_TREATMENT="treatment/setTreatment";


//액션 생성 함수 선언
export const createSetTreatment = (treatment) => {
  return {type:SET_TREATMENT, treatment};
} 

//리듀스 선언
const treatmentReducer = (state = initialState, action) => {
  if(action.type === SET_TREATMENT) {
    return {...state, treatment:action.treatment};
  } else {
    return state;
  }
}


export default treatmentReducer;