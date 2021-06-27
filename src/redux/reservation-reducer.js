const initialState = {
  reservation: {}
}
//액션 타입 선언
const SET_PATIENT="reservation/setReservation";


//액션 생성 함수 선언
export const createSetPatient = (reservation) => {
  return {type:SET_RESERVATION, reservation};
} 

//리듀스 선언
const reservationReducer = (state = initialState, action) => {
  if(action.type === SET_RESERVATION) {
    return {...state, reservation:action.reservation};
  } else {
    return state;
  }
}


export default reservationReducer;