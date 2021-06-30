import DiagnosisList from "./DignosisList";
import DrugList from "./DrugList";
import PatientTreatment from "./PatientTreatment";
import TestList from "./TestList";
import TreatmentMemo from "./TreatmentMemo";
import { useCallback, useEffect, useState } from "react";
import { getTretmentDiagnoses, getDiagnoses, getDrugs, getTreatemntDrugs, getTests, getPackageTests, getTreatmentTests } from "./data/Data";
import { useSelector } from "react-redux";
import PatientProfile from "./components/PatientProfile";
import { Col, Row, Toast } from "react-bootstrap";
import { updateTreatment } from "./data/TreatmentData";
import { getPatient } from "./data/PatientData";



function Treatment(props) {

  const globalPatient = useSelector((state) => {
    return state.patientReducer.patient;
  })

  const [patient, setPatient] = useState({
    patientname:"환자이름", 
    ssn1:"", 
    ssn2:"", 
    sex: "성별",
    age:"-",
    phonenumber: "-", 
  });
  const selectPatient = useCallback((patient) => {
    setPatient(patient);
    setTreatment({});
  }, []);

  useEffect(() => {
    const newPatient = getPatient(globalPatient.patientid);
    if(newPatient){
      setPatient(newPatient);
    }
    // 
  }, [globalPatient]) 

  const [treatment, setTreatment] = useState({})
  const selectTreatment = useCallback((treatment) => {
    setTreatment(treatment);
    console.log("treatment변경");
  }, [])

  const [treatmentDrugs, setTreatmentDrugs] = useState([]);
  const [treatmentDiagnoses, setTreatmentDiagnoses] = useState([]);
  const [treatmentTests, setTreatmentTests] = useState([]);

  const [staticDrugs, setStaticDrugs] = useState([]);
  const [staticDignoses, setStaticDignoses] = useState([]);
  const [staticTests, setStaticTests] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setStaticDrugs(getDrugs());
    setStaticDignoses(getDiagnoses());
    setStaticTests(getTests());
  },[])//정적 데이터 불러오기
  useEffect(() => {
    if(treatment.state==="진료 완료"){
      setTreatmentDrugs(getTreatemntDrugs(treatment.treatmentid));
      setTreatmentDiagnoses(getTretmentDiagnoses(treatment.treatmentid));
      setTreatmentTests(getTreatmentTests(treatment.treatmentid));
      console.log("데이터 변경");
    }
    return (() => {
      setTreatmentDrugs([]);
      setTreatmentDiagnoses([]);
      setTreatmentTests([]);
    })
  }, [treatment]);//선택한 진료 변경시 그 진료가 처방받은 약, 상병, 테스트 가져오기

  const prescribeDrugs = (prescriptionItems) => {
    setTreatmentDrugs(prescriptionItems);
  }//약 처방 함수

  const prescribeDiagnoses = (prescriptionItems) => {
    setTreatmentDiagnoses(prescriptionItems);
  }//증상 처방 함수

  const prescribeTests = (prescriptionItems) => {
    setTreatmentTests(prescriptionItems);
  }//검사 처방 함수

  const saveTreatment = (patient, treatmentDrugs, treatmentDiagnoses, treatmentTests) => {
    if(window.confirm("처방을 완료 하시겠습니까?") === true){
      setShow(true);
      // setTreatment({
      //   ...treatment,
      //   state:"진료 완료"
      // })
      updateTreatment(treatment.treatmentid);
    }
  }
  const closeShow = () => {
    setShow(false)
  }
  return (
    <>        
      <div style={{height:"5vh", marginBottom:"2vh",  marginTop:"1vh"}}>
        <PatientProfile selectedPatient={patient} treatment={treatment} selectPatient={selectPatient} saveTreatment={saveTreatment}  ></PatientProfile>
      </div>
      <div className="row ml-0 mr-0" style={{heighn:"92vh"}}>
        <div className="col-3 h-100 border-right">
          <div className="pl-3 pr-3 pt-0 pb-1 border border-dark" style={{height:"46vh", marginBottom:"2vh", backgroundColor:"#FFFFFF"}}>
            <PatientTreatment selectedPatient={patient} treatment={treatment} selectTreatment={selectTreatment}/>
          </div>
          <div className="pl-3 pr-3 pt-0 pb-1 border border-dark" style={{height:"42vh",marginBottom:"2vh", backgroundColor:"#FFFFFF"}}>
            <TreatmentMemo treatment={treatment}/>
          </div> 
        </div>
        <div className="col-4 h-100 border-right">
          <div className="pl-3 pr-3 pb-3 pt-0 border border-dark" style={{height:"46vh", backgroundColor:"#FFFFFF", marginBottom:"2vh"}}>
            <DiagnosisList treatment={treatment} treatmentDiagnoses={treatmentDiagnoses}
                  staticDignoses={staticDignoses} prescribeDiagnoses={prescribeDiagnoses}/>
          </div>
          <div className="pl-3 pr-3 pt-0 pb-1 border border-dark" style={{height:"42vh",marginBottom:"2vh",  backgroundColor:"#FFFFFF"}}>
            <DrugList treatment={treatment} treatmentDrugs={treatmentDrugs} 
                  staticDrugs={staticDrugs} prescribeDrugs={prescribeDrugs}/>
          </div>             
        </div>
        <div className="col-5 h-100">
          <div className="pl-3 pr-3 pb-3 pt-0 border border-dark" style={{height:"90vh",marginBottom:"2vh", backgroundColor:"#FFFFFF"}}>
            <TestList treatment={treatment} treatmentTests = {treatmentTests}
                  staticTests={staticTests} prescribeTests={prescribeTests} closeShow={closeShow} toastShow={show}></TestList>

          </div>                
        </div>
      </div>
    </>
  );
}

export default Treatment;