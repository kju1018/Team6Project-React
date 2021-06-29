import { combineReducers } from "redux";
import patientReducer from "./patient-reducer"
import treatmentReducer from "./treatment-reducer"
import reservationReducer from "./reservation-reducer"
import receptionReducer from "./reception-reducer"
import authReducer from "./auth-rducer"
import websocketReducer from "./websocket-reducer"
const rootReducer = combineReducers({
  patientReducer,
  treatmentReducer,
  reservationReducer,
  receptionReducer,
  authReducer,
  websocketReducer

});

export default rootReducer;