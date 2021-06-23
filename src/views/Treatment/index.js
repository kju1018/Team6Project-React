import DiagnosisList from "./DignosisList";
import DrugList from "./DrugList";
import PatientProfile from "./PatientProfile";
import ReceptionList from "./ReceptionList";
import PatientTreatment from "./PatientTreatment";
import TestList from "./TestList";
import TreatmentMemo from "./TreatmentMemo";
import { useCallback, useEffect, useState } from "react";
import { getDiagnoses, getDiagnosis, getDrugs, getTreatemntDrugs } from "./data/Data";


function Treatment(props) {

  const [patient, setPatient] = useState({
    patientname:"환자이름", 
    ssn1:"-", 
    ssn2:"-", 
    sex: "성별",
    age:"-",
    phonenumber: "-", 
  });
  const selectPatient = useCallback((patient) => {
    setPatient(patient);
    setTreatment({});
  }, []);

  const [treatment, setTreatment] = useState({})
  const selectTreatment = useCallback((treatment) => {
    setTreatment(treatment);
  }, [])

  const [treatmentDrugs, setTreatmentDrugs] = useState([]);
  const [treatmentDiagnoses, setTreatmentDiagnoses] = useState([]);

  const [staticDrugs, setStaticDrugs] = useState([]);
  const [staticDignosis, setStaticDignosis] = useState([]);

  useEffect(() => {
    setStaticDrugs(getDrugs());
    setStaticDignosis(getDiagnosis());
  },[])//정적 데이터 불러오기

  useEffect(() => {
    if(treatment.state==="진료 완료"){
      setTreatmentDrugs(getTreatemntDrugs(treatment.treatmentid));
      setTreatmentDiagnoses(getDiagnoses(treatment.treatmentid));
    }
    return (() => {
      setTreatmentDrugs([]);
      setTreatmentDiagnoses([]);
    })
  }, [treatment]);//선택한 진료 변경시 그 진료가 처방받은 약, 상병, 테스트 가져오기

  const prescribeDrugs = (prescriptionItems) => {
    setTreatmentDrugs(prescriptionItems);
  }
  console.log(treatmentDrugs);
  return (
    <div className="vh-100 row ml-0 mr-0">
      <div className="col-4 h-100 border-right">
        <div className="d-flex align-items-end justify-content-start" style={{height:"5vh", marginLeft:"15px"}}>
        </div>
        <div className="pl-3 pr-3 pt-0 pb-1" style={{height:"33vh", backgroundColor:"#FFFFFF", marginBottom:"1vh"}}>
          <ReceptionList selectPatient={selectPatient}/>
        </div>

        <div className="pl-3 pr-3 pt-0 pb-1" style={{height:"30vh", backgroundColor:"#FFFFFF", marginBottom:"1vh"}}>
          <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#E89677", width:"40px", color:"#FFFFFF"}}><i className="bi bi-person-square"></i></div><div className="d-flex align-items-center">환자프로필</div></div>
          <PatientProfile selectedPatient={patient}/>
        </div>

        <div className="pl-3 pr-3 pt-0 pb-1" style={{height:"30vh", backgroundColor:"#FFFFFF"}}>
          <PatientTreatment selectedPatient={patient} treatment={treatment} selectTreatment={selectTreatment}/>
        </div>
      </div>
      <div className="col-4 h-100 border-right">
        <div style={{height:"5vh"}}></div>
        <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"34vh", backgroundColor:"#FFFFFF", marginBottom:"1vh"}}>
          <DiagnosisList diagnoses={treatmentDiagnoses}/>
        </div>
        <div className="pl-3 pr-3 pt-0 pb-1" style={{height:"34vh", backgroundColor:"#FFFFFF", marginBottom:"1vh"}}>
          <DrugList treatment={treatment} treatmentDrugs={treatmentDrugs} 
                staticDrugs={staticDrugs} prescribeDrugs={prescribeDrugs}/>
        </div>
        <div className="pl-3 pr-3 pt-0 pb-1" style={{height:"25vh", backgroundColor:"#FFFFFF"}}>
          <TreatmentMemo treatment={treatment}/>
        </div>                
      </div>
      <div className="col-4 h-100">
        <div className="text-right pt-2 pr-2" style={{height:"5vh"}}><button className="btn btn-sm btn-success">저장</button></div>
        <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"95vh", backgroundColor:"#FFFFFF"}}>
          <TestList treatment={treatment}/>
        </div>                
      </div>

    </div>

  );
}

export default Treatment;