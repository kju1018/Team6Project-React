import { combineReducers } from "redux";
import patientReducer from "./patient-reducer"
import treatmentReducer from "./treatment-reducer"
import reservationReducer from "./reservation-reducer"
const rootReducer = combineReducers({
  patientReducer,
  treatmentReducer,
  reservationReducer
});

export default rootReducer;