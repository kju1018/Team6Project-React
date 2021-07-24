import DiagnosisList from "./DiagnosisList";
import DrugList from "./DrugList";
import PatientTreatment from "./PatientTreatment";
import TestList from "./TestList";
import TreatmentMemo from "./TreatmentMemo";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PatientProfile from "./components/PatientProfile";
import { getPatient, getStaticDiagnoses, getStaticDrugs, getPrescriptionList, prescribeTreatment, getAllTreatments, getStaticTests, getTestList, updateTreatment } from "apis/Treatment";
import { sendRedisMessage } from "apis/Redis";
import { Col, Row, Toast } from "react-bootstrap";
import Swal from "sweetalert2";




function Treatment(props) {

  const globalPatient = useSelector((state) => {
    return state.patientReducer.patient;
  })
  const globalUserid = useSelector((state) => {return state.authReducer.userid});

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
  }, []);

  useEffect(() => {
    if(globalPatient.patientid != null){
      const response = getPatient(globalPatient.patientid);
      response.then((response) => {
        setPatient(response.data);
      }).catch((error) => {
        console.log(error);
      })
      
    }
  }, [globalPatient]) 

  const [treatment, setTreatment] = useState({})
  const [patientTreatments, setPatientTreatments] = useState([]);
  const [treatmentDrugs, setTreatmentDrugs] = useState([]);
  const [treatmentDiagnoses, setTreatmentDiagnoses] = useState([]);
  const [treatmentTests, setTreatmentTests] = useState([]);
  const [memo, setMemo] = useState("");

  const [staticDrugs, setStaticDrugs] = useState([]);
  const [staticDignoses, setStaticDignoses] = useState([]);
  const [staticTests, setStaticTests] = useState([]);
  const [show, setShow] = useState(false);
  const [prescribeLoading, setPrescribeLoading] = useState(false);
  const [treatmentsLoading, setTreatmentLoading] = useState(false);

  //진료 선택
  const selectTreatment = useCallback(async(treatment) => {
    if(treatment.status === "진료 대기"){
      if(treatment.userid === globalUserid){
        const start = await Swal.fire({
          text: "진료를 시작하시겠습니까?",
          width: "430px",
          confirmButtonText: "진료시작",
          confirmButtonColor:"#3E5799",
          denyButtonText:"취소",
          showDenyButton:true,
          imageUrl:"/question-mark.png",
          imageWidth: 150,
        })

        if(start.isConfirmed === true){
          try {
            const response = await updateTreatment({...treatment, treatmentdate: null});
            if(response.data === "success") {
              console.log(response.data);
              const message = {
                type:"treatment",
                patientid:treatment.patientid,
                status:"진행"
              };
              sendRedisMessage(message);//진료가 완료 되었다는 사실을 접수처에 알림
              setTreatment({
                ...treatment,
                status:"진료중"
              });

              setPatientTreatments((prevList) => {
                const newTreatments = prevList.map((prevtreatment) => {
                  if(prevtreatment.treatmentid === treatment.treatmentid) {
                    return {...prevtreatment, status:"진료중"}
                  } else {
                    return prevtreatment;
                  }
                })
                return newTreatments;
              })
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        Swal.fire({
          text:`담당 의사만 해당 진료를 진행할 수 있습니다. 
          담당의사: ${treatment.userid}`,
          width: "430px",
          imageUrl:"/clear.svg",
          imageWidth: 150,
          confirmButtonText:"확인",
          confirmButtonColor:"#3E5799"
        });
      
      }
    } else {
      setTreatment(treatment);
    }

  }, [globalUserid])

  //선택한 진료 변경시 그 진료가 처방받은 약, 상병, 테스트 가져오기
  useEffect(() => {
    if(treatment.status==="진료 완료"){
      const work = async() => {
        try {
          setPrescribeLoading(true);
          const response = await getPrescriptionList(treatment.treatmentid);
          setTreatmentDrugs(() => response.data.drugsList);
          setTreatmentDiagnoses(() => response.data.diagnosesList);
          setTreatmentTests(() => response.data.testsList);
        } catch (error) {
          console.log(error);
        } finally {
          setPrescribeLoading(false);
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
  }, [treatment]);

  //정적 데이터 불러오기
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
  },[])


  const testResult = useSelector((state) => {
    return state.receptionReducer.testresult;
  })

  //testResult가 바뀔 때 
  useEffect(() => {
    if(testResult.treatmentid != null && testResult.treatmentid === treatment.treatmentid){
      const response = getTestList(treatment.treatmentid);
      response.then((response) => {
        setTreatmentTests(response.data);
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [testResult]);

  // 환자가 바뀔때
  useEffect(() => {
    const work = async() => {
      try {
        setTreatmentLoading(true);
        const response = await getAllTreatments(patient.patientid);
        if(response.data){
          setPatientTreatments(() => {
            return response.data
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTreatmentLoading(false);
      }
    }
    work();
    setMemo("");
    setTreatment({});
  }, [patient])

  //약 처방 함수
  const prescribeDrugs = useCallback((prescriptionItems) => {
    setTreatmentDrugs(prescriptionItems) 
  }, []);
 

   //증상 처방 함수
  const prescribeDiagnoses = useCallback((prescriptionItems) => {
    setTreatmentDiagnoses(prescriptionItems)
  },[]);


  //검사 처방 함수
  const prescribeTests = useCallback((prescriptionItems) => {
    setTreatmentTests(prescriptionItems);
  }, [])

  const prescribeList = async() => {
    try {
      let prescription = {};

      let newTreatment = {
        ...treatment,
        treatmentdate:null,
        memo:memo
      }

      prescription.treatmentDrugs = [...treatmentDrugs];
      prescription.treatmentDiagnoses = [...treatmentDiagnoses];

      prescription.treatmentTests = [...treatmentTests];
      prescription.treatment = newTreatment;
      prescription.userid = globalUserid;
      prescription.patientid = patient.patientid;
      const response = await prescribeTreatment(prescription);
      if(response.data === "success"){
        const response = await getAllTreatments(patient.patientid);

        if(response.data){
          setMemo("");
          setPatientTreatments(response.data);
          const message = {
            type:"treatment",
            patientid:patient.patientid,
            status:"완료"
          };
          newTreatment.status = "진료 완료"
          newTreatment.treatmentdate = treatment.treatmentdate;
          sendRedisMessage(message);//진료가 완료 되었다는 사실을 접수처에 알림
          setTreatment(newTreatment);
        }
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  const saveTreatment = async() => {
    const start = await Swal.fire({
      text: "처방을 완료 하시겠습니까?",
      width: "430px",
      confirmButtonText: "완료",
      confirmButtonColor:"#3E5799",
      denyButtonText:"취소",
      showDenyButton:true,
      imageUrl:"/question-mark.png",
      imageWidth: 150,
    })
    if(start.isConfirmed === true){
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
            <PatientTreatment loading={treatmentsLoading} selectedPatient={patient} treatment={treatment} selectTreatment={selectTreatment} patientTreatments={patientTreatments}/>
          </div>
          <div className="pl-3 pr-3 pt-0 pb-1 border border-dark" style={{height:"42vh",marginBottom:"2vh", backgroundColor:"#FFFFFF"}}>
            <TreatmentMemo treatment={treatment} setMemo={setMemo} memo={memo}/>
          </div> 
        </div>
        <div className="col-4 h-100 border-right">
          <div className="pl-3 pr-3 pb-3 pt-0 border border-dark" style={{height:"46vh", backgroundColor:"#FFFFFF", marginBottom:"2vh"}}>
            <DiagnosisList loading={prescribeLoading} treatment={treatment} treatmentDiagnoses={treatmentDiagnoses}
                  staticDignoses={staticDignoses} prescribeDiagnoses={prescribeDiagnoses}/>
          </div>
          <div className="pl-3 pr-3 pt-0 pb-1 border border-dark" style={{height:"42vh",marginBottom:"2vh",  backgroundColor:"#FFFFFF"}}>
            <DrugList loading={prescribeLoading} treatment={treatment} treatmentDrugs={treatmentDrugs} 
                  staticDrugs={staticDrugs} prescribeDrugs={prescribeDrugs}/>
          </div>             
        </div>
        <div className="col-5 h-100">
          <div className="pl-3 pr-3 pb-3 pt-0 border border-dark" style={{height:"90vh",marginBottom:"2vh", backgroundColor:"#FFFFFF"}}>
            <TestList loading={prescribeLoading} treatment={treatment} treatmentTests = {treatmentTests}
                  staticTests={staticTests} prescribeTests={prescribeTests} closeShow={closeShow} toastShow={show}></TestList>
          </div>                
        </div>
      </div>
    </>
  );
}

export default Treatment;