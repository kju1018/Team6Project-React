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
    sex: "여",
    age:10,
    phonenumber: "010-1234-1234", 
    lasttreatment:(new Date).toLocaleDateString(),
    registerday:(new Date).toLocaleDateString(),
    state: "대기"
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
    <>
      <div style={{height:"5vh", marginBottom:"2vh",  marginTop:"1vh"}}>
        <div className="h-100 pl-3 pr-3 d-flex align-items-center" style={{backgroundColor:"#15367B", marginRight:"15px", marginLeft:"15px"}}>
          {/* 8vh */}
          <div className="d-flex col">
            <div className="col-2 pl-0 pr-0 d-flex align-items-center text-center" >
              <div className="col-4 pl-0 pr-0" style={{fontWeight:"bold", color:"#FBFBFB"}}>이름</div>
              <div className="text-center pl-0 pr-0 pt-1 pb-1 ml-0 mr-0 col-8" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"7px", fontSize:"14px", backgroundColor:"#FFFFFF"}}>김민석</div>
            </div>
            <div className="col-2 pl-3 pr-0 d-flex align-items-center text-center">
              <div className="col-4 pl-0 pr-0" style={{fontWeight:"bold", color:"#FBFBFB"}}>나이</div>
              <div className="text-center pl-0 pr-0 pt-1 pb-1 ml-0 mr-0 col-8" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"7px", fontSize:"14px", backgroundColor:"#FFFFFF"}}>27세</div>
            </div>
            <div className="col-2 pl-3 pr-0 d-flex align-items-center text-center">
              <div className="col-4 pl-0 pr-0" style={{fontWeight:"bold", color:"#FBFBFB"}}>성별</div>
              <div className="text-center pl-0 pr-0 pt-1 pb-1 ml-0 mr-0 col-8" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"7px", fontSize:"14px", backgroundColor:"#FFFFFF"}}>남</div>
            </div>
            <div className="col-4 pl-3 pr-0 d-flex align-items-center text-center">
              <div className="col-3 pl-0 pr-0" style={{fontWeight:"bold", color:"#FBFBFB"}}>주민등록번호</div>
              <div className="text-center pt-1 pb-1 pl-0 pr-0 ml-0 mr-0 col-6" style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"7px", fontSize:"14px", backgroundColor:"#FFFFFF"}}>951018 - 1234567</div>
            </div>
            <div className="col-2 pl-3 pr-0  text-right">
                <button className="btn btn-dark btn-sm">환자 검색</button>
                <button className="btn btn-dark btn-sm ml-2 mr-5">저장</button>
            </div>
          </div>
        </div>
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
            <DiagnosisList diagnoses={treatmentDiagnoses}/>
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