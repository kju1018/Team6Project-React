const initialState = {
    testreception: {},
    treatmentreception:{}

  }
  
  //액션 타입 선언
  const SET_TESTRECEPTION="reception/setTestReception";
  
  const SET_TREATMENTRECEPTION="reception/setTreatmentReception";
  
  
  //액션 생성 함수 선언
  export const createSetTestReception = (testreception) => {
    return {type:SET_TESTRECEPTION, testreception};
  } 

  export const createSetTreatmentReception = (treatmentreception) => {
    return {type:SET_TREATMENTRECEPTION, treatmentreception};
  } 
  
  //리듀스 선언
  const receptionReducer = (state = initialState, action) => {
    if(action.type === SET_TESTRECEPTION) {
      return {...state, testreception:action.testreception};
    }else if(action.type === SET_TREATMENTRECEPTION) {
      return {...state, treatmentreception:action.treatmentreception};
    }else {
      return state;
    }
  }
  
  
  export default receptionReducer;