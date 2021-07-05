import { useCallback, useEffect, useState } from "react";
import TreatmentItem from "./components/TreatmentItem";
import { getAllTreatments } from "apis/Treatment"

function PatientTreatment(props) {

  // console.log("PatientTreatment");
  const [patientTreatments, setPatientTreatments] = useState([]);

  useEffect(() => {
    const work = async() => {
      try {
        const response = await getAllTreatments(props.selectedPatient.patientid);
        console.log(response.data);
        if(response.data){
          setPatientTreatments(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    work();

  }, [props.selectedPatient])

  const selectTreatment = useCallback((treatment) => {
    console.log(treatment);
    props.selectTreatment(treatment);
  }, [props])

  useEffect(() => {
  }, [props.treatment])
  return (
    <>
      <div className="row d-flex justify-content-between"style={{backgroundColor:"#FFFFFF", paddingLeft:"15px", paddingRight:"15px"}}>
        <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#887BD2", width:"40px", color:"#FFFFFF"}}><i className="bi bi-calendar2-check"></i></div><div className="d-flex align-items-center">진료 내역</div></div>
      </div>
      <div className="d-flex align-items-center pb-1" style={{height:"50px", width:"250px"}}>선택한 진료: {props.treatment.treatmentdate}</div>
      {
      props.selectedPatient.patientid != null ? 
      <>
        <div className="overflow-auto p-3" style={{height:"calc(100% - 100px)"}}>
          {
          (patientTreatments === null || patientTreatments.length === 0) ?  
          <div className="overflow-auto p-3 border-top justify-content-center d-flex align-items-center" style={{height:"100%"}}>
            <span><i className="bi bi-clipboard-x mr-1"></i>선택한 환자의 진료내역이 없습니다.</span>
          </div>
          : 
          patientTreatments.map (treatment => {
          return (
            <TreatmentItem key={treatment.treatmentid} item={treatment} property={["treatmentdate", "status"]} onClick={selectTreatment}></TreatmentItem>
          );
          })}
        </div>
      </>
      :
      <div className="overflow-auto p-3 border-top justify-content-center d-flex align-items-center" style={{height:"calc(100% - 100px)"}}>
        <span><i className="bi bi-file-person mr-1"></i>환자를 선택해주세요.</span>
      </div>
      }

    </>
  );
}

export default PatientTreatment;




// selectedTreatment.treatmentid === treatment.treatmentid ?  {cursor:"pointer", backgroundColor:"#38B2AC"} : 