const initialState = {
  realtime: {}
}

//액션 타입 선언
const SET_REALTIME="realtime/setRealTime";
const SET_="realtime/setRealTime";

//액션 생성 함수 선언
export const createSetRealTime = (realtime) => {
  return {type:SET_REALTIME, realtime};
} 

//리듀스 선언
const realtimeReducer = (state = initialState, action) => {
  if(action.type === SET_REALTIME) {
    return {...state, realtime:action.realtime};
  } else {
    return state;
  }
}


export default realtimeReducer;