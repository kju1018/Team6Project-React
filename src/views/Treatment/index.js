import DiagnosisList from "./DignosisList";
import DrugList from "./DrugList";
import PatientTreatment from "./PatientTreatment";
import TestList from "./TestList";
import TreatmentMemo from "./TreatmentMemo";
import { useCallback, useEffect, useState } from "react";
import { getTretmentDiagnoses, getDiagnoses, getDrugs, getTreatemntDrugs } from "./data/Data";
import { useSelector } from "react-redux";
import PatientProfile from "./components/PatientProfile";


function Treatment(props) {

  const globalPatient = useSelector((state) => {
    return state.patientReducer.patient;
  })

  const [patient, setPatient] = useState({
    // patientname:"환자이름", 
    // ssn1:"-", 
    // ssn2:"-", 
    // sex: "성별",
    // age:"-",
    // phonenumber: "-", 
    patientid:1, 
    patientname:"환자이름", 
    ssn1:"951018", 
    ssn2:"1111111", 
    sex: "남",
    age:10,
    phonenumber: "010-1234-1234", 
    lasttreatment:(new Date).toLocaleDateString(),
    registerday:(new Date).toLocaleDateString(),
    state: "대기"
  });
  // const selectPatient = useCallback((patient) => {
  //   setPatient(patient);
  //   setTreatment({});
  // }, []);

  // useEffect(() => {
  //globalPatient가 변경될 때 patient 변경
  // }, [globalPatient]) 

  const [treatment, setTreatment] = useState({})
  const selectTreatment = useCallback((treatment) => {
    setTreatment(treatment);
  }, [])

  const [treatmentDrugs, setTreatmentDrugs] = useState([]);
  const [treatmentDiagnoses, setTreatmentDiagnoses] = useState([]);

  const [staticDrugs, setStaticDrugs] = useState([]);
  const [staticDignoses, setStaticDignoses] = useState([]);

  useEffect(() => {
    setStaticDrugs(getDrugs());
    setStaticDignoses(getDiagnoses());
  },[])//정적 데이터 불러오기

  useEffect(() => {
    if(treatment.state==="진료 완료"){
      setTreatmentDrugs(getTreatemntDrugs(treatment.treatmentid));
      setTreatmentDiagnoses(getTretmentDiagnoses(treatment.treatmentid));
    }
    return (() => {
      setTreatmentDrugs([]);
      setTreatmentDiagnoses([]);
    })
  }, [treatment]);//선택한 진료 변경시 그 진료가 처방받은 약, 상병, 테스트 가져오기

  const prescribeDrugs = (prescriptionItems) => {
    setTreatmentDrugs(prescriptionItems);
  }//약 처방 함수

  const prescripbeDiagnoses = (prescriptionItems) => {
    setTreatmentDiagnoses(prescriptionItems);
  }

  return (
    <>
      <div style={{height:"5vh", marginBottom:"2vh",  marginTop:"1vh"}}>
        <PatientProfile selectedPatient={patient}></PatientProfile>
      </div>
      <div className="row ml-0 mr-0" style={{heighn:"92vh"}}>
        <div className="col-3 h-100 border-right">
          <div className="pl-3 pr-3 pt-0 pb-1" style={{height:"46vh", marginBottom:"2vh", backgroundColor:"#FFFFFF"}}>
            <PatientTreatment selectedPatient={patient} treatment={treatment} selectTreatment={selectTreatment}/>
          </div>
          <div className="pl-3 pr-3 pt-0 pb-1" style={{height:"44vh", backgroundColor:"#FFFFFF"}}>
            <TreatmentMemo treatment={treatment}/>
          </div> 
        </div>
        <div className="col-5 h-100 border-right">
          <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"46vh", backgroundColor:"#FFFFFF", marginBottom:"2vh"}}>
            <DiagnosisList treatment={treatment} treatmentDiagnoses={treatmentDiagnoses}
                  staticDignoses={staticDignoses} prescripbeDiagnoses={prescripbeDiagnoses}/>
          </div>
          <div className="pl-3 pr-3 pt-0 pb-1" style={{height:"44vh", backgroundColor:"#FFFFFF"}}>
            <DrugList treatment={treatment} treatmentDrugs={treatmentDrugs} 
                  staticDrugs={staticDrugs} prescribeDrugs={prescribeDrugs}/>
          </div>             
        </div>
        <div className="col-4 h-100">
          <div className="pl-3 pr-3 pb-3 pt-0" style={{height:"89vh", backgroundColor:"#FFFFFF"}}>
            <TestList treatment={treatment}/>
          </div>                
        </div>

      </div>
    </>
  );
}

export default Treatment;