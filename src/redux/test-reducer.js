const initialState = {
  test: { 
  }
}

//액션 타입 선언
const SET_TEST="test/setTest";


//액션 생성 함수 선언
export const createSetTest = (test) => {
  return {type:SET_TEST, test};
} 

//리듀스 선언
const testReducer = (state = initialState, action) => {
  if(action.type === SET_TEST) {
    return {...state, test:action.test};
  } else {
    return state;
  }
}


export default testReducer;