import DiagnosisList from "./DignosisList";
import DrugList from "./DrugList";
import PatientProfile from "./PatientProfile";
import ReceptionList from "./ReceptionList";
import PatientTreatment from "./PatientTreatment";
import TestList from "./TestList";
import TreatmentMemo from "./TreatmentMemo";
import { useCallback, useState } from "react";


function Treatment(props) {

  const [patient, setPatient] = useState({
    patientname:"환자이름", 
    ssn1:"-", 
    ssn2:"-", 
    sex: "성별",
    age:"-",
    phonenumber: "-", 
  });

  const [treatment, setTreatment] = useState({})
  
  const selectPatient = useCallback((patient) => {
    setPatient(patient);
    setTreatment({});
  }, []);

  const selectTreatment = useCallback((treatment) => {
    setTreatment(treatment);
  }, [])
  
  return (
    <div className="vh-100 row ml-0 mr-0">
      <div className="col-4 h-100 border-right">
        <div className="d-flex align-items-end justify-content-start" style={{height:"5vh", marginLeft:"15px"}}>
        </div>
        <div className="pl-3 pr-3 pt-0" style={{height:"30vh", backgroundColor:"#FFFFFF"}}>
          <ReceptionList selectPatient={selectPatient}/>
        </div>

        <div className="p-3" style={{height:"35vh", backgroundColor:"#FFFFFF"}}>
          <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#E89677", width:"40px", color:"#FFFFFF"}}><i className="bi bi-person-square"></i></div><div className="d-flex align-items-center">환자프로필</div></div>
          <PatientProfile selectedPatient={patient}/>
        </div>

        <div className="p-3" style={{height:"30vh", backgroundColor:"#FFFFFF"}}>
          <PatientTreatment selectedPatient={patient} selectedTreatment={treatment} selectTreatment={selectTreatment}/>
        </div>
      </div>
      <div className="col-4 h-100 border-right">
        <div style={{height:"5vh"}}></div>
        <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"35vh", backgroundColor:"#FFFFFF"}}>
          <DiagnosisList selectedTreatment={treatment}/>
        </div>
        <div className="p-3" style={{height:"35vh", backgroundColor:"#FFFFFF"}}>
          <DrugList selectedTreatment={treatment} />
        </div>
        <div className="p-3" style={{height:"25vh", backgroundColor:"#FFFFFF"}}>
          <TreatmentMemo selectedTreatment={treatment}/>
        </div>                
      </div>
      <div className="col-4 h-100">
        <div className="text-right pt-2 pr-2" style={{height:"5vh"}}><button className="btn btn-sm btn-success">저장</button></div>
        <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"95vh", backgroundColor:"#FFFFFF"}}>
          <TestList selectedTreatment={treatment}/>
        </div>                
      </div>

    </div>

  );
}

export default Treatment;