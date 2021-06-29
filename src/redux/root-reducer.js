import { combineReducers } from "redux";
import patientReducer from "./patient-reducer"
import treatmentReducer from "./treatment-reducer"
import reservationReducer from "./reservation-reducer"
import receptionReducer from "./reception-reducer"
const rootReducer = combineReducers({
  patientReducer,
  treatmentReducer,
  reservationReducer,
  receptionReducer
});

export default rootReducer;