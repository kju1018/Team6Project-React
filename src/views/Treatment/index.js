import DiagnosisList from "./DignosisList";
import DrugList from "./DrugList";
import PatientTreatment from "./PatientTreatment";
import TestList from "./TestList";
import TreatmentMemo from "./TreatmentMemo";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PatientProfile from "./components/PatientProfile";
import { getStaticDiagnoses, getStaticDrugs, getPrescriptionList, prescribeTreatment, getAllTreatments, getStaticTests } from "apis/Treatment";

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
    if(globalPatient.patientid != null){
      setPatient(globalPatient);
    }
  }, [globalPatient]) 

  const [treatment, setTreatment] = useState({})

  const selectTreatment = useCallback((treatment) => {
    setTreatment(treatment);
  }, [])

  const [patientTreatments, setPatientTreatments] = useState([]);
  const [treatmentDrugs, setTreatmentDrugs] = useState([]);
  const [treatmentDiagnoses, setTreatmentDiagnoses] = useState([]);
  const [treatmentTests, setTreatmentTests] = useState([]);
  const [memo, setMemo] = useState("");

  const [staticDrugs, setStaticDrugs] = useState([]);
  const [staticDignoses, setStaticDignoses] = useState([]);
  const [staticTests, setStaticTests] = useState([]);
  const [show, setShow] = useState(false);

  // const handlechange = (event) => {
  //   setMemo({
  //     [event.target.name]
  //   })
  // }

  useEffect(() => {
    const work = async() => {
      try {
        const drugResponse = await getStaticDrugs();
        const diagnosesResponse = await getStaticDiagnoses();
        const testResponse = await getStaticTests();
        setStaticDrugs(drugResponse.data);
        setStaticDignoses(diagnosesResponse.data);
        setStaticTests(testResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    work();
  },[])//정적 데이터 불러오기

  useEffect(() => {
    if(treatment.status==="진료 완료"){
      const work = async() => {
        try {
          const response = await getPrescriptionList(treatment.treatmentid);
          setTreatmentDrugs(() => response.data.drugsList);
          setTreatmentDiagnoses(() => response.data.diagnosesList);
          setTreatmentTests(() => response.data.testsList);
        } catch (error) {
          console.log(error);
        }
      }
      work();
    }
    return (() => {
      setTreatmentDrugs([]);
      setTreatmentDiagnoses([]);
      setTreatmentTests([]);
      setMemo("");
      })
  }, [treatment]);//선택한 진료 변경시 그 진료가 처방받은 약, 상병, 테스트 가져오기

  useEffect(() => {
    const work = async() => {
      try {
        console.log(patient.patientid);
        const response = await getAllTreatments(patient.patientid);
        if(response.data){
          console.log("갱신");
          setPatientTreatments(() => {
            return response.data
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    work();
    setMemo("");
  }, [patient])
  const prescribeDrugs = (prescriptionItems) => {
    setTreatmentDrugs(prescriptionItems);
  }//약 처방 함수

  const prescribeDiagnoses = (prescriptionItems) => {
    setTreatmentDiagnoses(prescriptionItems);
  }//증상 처방 함수

  const prescribeTests = (prescriptionItems) => {
    setTreatmentTests(prescriptionItems);
  }//검사 처방 함수

  const prescribeList = async() => {
    try {
      let prescription = {};
      const newTreatment = {
        ...treatment,
        memo:memo
      }
      prescription.treatmentDrugs = [...treatmentDrugs];
      prescription.treatmentDiagnoses = [...treatmentDiagnoses];
      prescription.treatmentTests = [...treatmentTests];
      prescription.treatment = newTreatment;
      prescription.userid ="user1";
      prescription.patientid = patient.patientid;
      const response = await prescribeTreatment(prescription);
      if(response.data === "success"){
        const response = await getAllTreatments(patient.patientid);
        if(response.data){
          setMemo("");
          setPatientTreatments(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const saveTreatment = (patient, treatmentDrugs, treatmentDiagnoses, treatmentTests) => {
    if(window.confirm("처방을 완료 하시겠습니까?") === true){
      prescribeList();
      setShow(true);
    }
  }
  const closeShow = () => {
    setShow(false)
  }
  return (
    <>        
      <div style={{height:"5vh", marginBottom:"2vh",  marginTop:"1vh"}}>
        <PatientProfile selectedPatient={patient} treatment={treatment} selectPatient={selectPatient} saveTreatment={saveTreatment} ></PatientProfile>
      </div>
      <div className="row ml-0 mr-0" style={{heighn:"92vh"}}>
        <div className="col-3 h-100 border-right">
          <div className="pl-3 pr-3 pt-0 pb-1 border border-dark" style={{height:"46vh", marginBottom:"2vh", backgroundColor:"#FFFFFF"}}>
            <PatientTreatment selectedPatient={patient} treatment={treatment} selectTreatment={selectTreatment} patientTreatments={patientTreatments}/>
          </div>
          <div className="pl-3 pr-3 pt-0 pb-1 border border-dark" style={{height:"42vh",marginBottom:"2vh", backgroundColor:"#FFFFFF"}}>
            <TreatmentMemo treatment={treatment} setMemo={setMemo} memo={memo}/>
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