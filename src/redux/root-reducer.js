import { combineReducers } from "redux";
import patientReducer from "./patient-reducer"
import treatmentReducer from "./treatment-reducer"

const rootReducer = combineReducers({
  patientReducer,
  treatmentReducer
});

export default rootReducer;