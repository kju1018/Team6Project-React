import { combineReducers } from "redux";
import patientReducer from "./patient-reducer"

const rootReducer = combineReducers({
  patientReducer
});

export default rootReducer;