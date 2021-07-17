const initialState = {
  toast: {}
}

//액션 타입 선언
const SET_TOAST="toast/setToast";

//액션 생성 함수 선언
export const createSetToast = (toast) => {
  return {type:SET_TOAST, toast};
} 

//리듀스 선언
const realtimeReducer = (state = initialState, action) => {
  if(action.type === SET_TOAST) {
    return {...state, toast:action.toast};
  } else {
    return state;
  }
}


export default realtimeReducer;