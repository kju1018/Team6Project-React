import DiagnosisList from "./DignosisList";
import DrugList from "./DrugList";
import PatientProfile from "./PatientProfile";
import ReceptionList from "./ReceptionList";
import PatientTreatment from "./PatientTreatment";
import TestList from "./TestList";
import TreatmentMemo from "./TreatmentMemo";
import TestResult from "./TestResult";


function Treatment(props) {
  //patient
  //oclick()
  return (
    <div className="vh-100 row ml-0 mr-0">
      <div className="col-4 h-100">
        <div className="d-flex align-items-end justify-content-start" style={{height:"5vh", marginLeft:"15px"}}>
        </div>
        <div className="pl-3 pr-3 pt-0" style={{height:"30vh"}}>
          <ReceptionList/>
        </div>

        <div className="p-3" style={{height:"35vh"}}>
          <div className="d-flex align-items-center" style={{height:"50px"}}><i className="bi bi-person-square mr-1"></i>환자 프로필</div>
          <PatientProfile/>
        </div>

        <div className="p-3" style={{height:"30vh"}}>
          <PatientTreatment/>
        </div>
      </div>
      <div className="col-4 h-100">
        <div style={{height:"5vh"}}></div>
        <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"35vh"}}>
          <DiagnosisList/>
        </div>
        <div className="p-3" style={{height:"35vh"}}>
          <DrugList/>
        </div>
        <div className="p-3" style={{height:"25vh"}}>
          <TreatmentMemo/>
        </div>                
      </div>
      <div className="col-4 h-100">
        <div style={{height:"5vh"}}></div>
        <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"95vh"}}>
          <TestList/>
        </div>                
      </div>
    </div>

  );
}

export default Treatment;