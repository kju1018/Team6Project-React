import DiagnosisList from "./DignosisList";
import DrugList from "./DrugList";
import PatientProfile from "./PatientProfile";
import PatientWaiting from "./PatientWaiting";
import PatientTreatment from "./PtientTreatment";
import TestList from "./TestList";
import TreatmentMemo from "./TreatmentMemo";


function Treatment(props) {
  return (
    <div className="vh-100 row ml-0 mr-0">
      <div className="col-4 h-100">
        <div className="d-flex align-items-end justify-content-start" style={{height:"5vh", marginLeft:"15px"}}>
        {/* <button className="btn btn-info btn-sm">환자 검색</button> */}
        </div>
        <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"30vh"}}>
          <PatientWaiting/>
        </div>

        <div className="p-3" style={{height:"35vh"}}>
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
        <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"35vh"}}>
          <TestList/>
        </div>
        <div className="p-3 bg-success" style={{height:"25vh"}}>
          
        </div>
        <div className="p-3 bg-secondary" style={{height:"35vh"}}>
          
        </div>                 
      </div>
    </div>

  );
}

export default Treatment;