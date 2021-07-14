const initialState = {
    testreception: {},
    treatmentreception:{},
    testresult:{}
  }
  
  //액션 타입 선언
  const SET_TESTRECEPTION="reception/setTestReception";
  const SET_TREATMENTRECEPTION="reception/setTreatmentReception";
  const SET_TESTRESULT="reception/setTestResult";
  
  
  //액션 생성 함수 선언
  export const createSetTestReception = (testreception) => {
    return {type:SET_TESTRECEPTION, testreception};
  } 

  export const createSetTreatmentReception = (treatmentreception) => {
    return {type:SET_TREATMENTRECEPTION, treatmentreception};
  } 
  export const createSetTestResult = (testresult) => {
    return {type:SET_TESTRESULT, testresult};
  } 
  
  //리듀스 선언
  const receptionReducer = (state = initialState, action) => {
    if(action.type === SET_TESTRECEPTION) {
      return {...state, testreception:action.testreception};
    }else if(action.type === SET_TREATMENTRECEPTION) {
      return {...state, treatmentreception:action.treatmentreception};
    }else if(action.type === SET_TESTRESULT){
      return {...state, testresult:action.testresult};
    }else {
      return state;
    }
  }
  
  
  export default receptionReducer;