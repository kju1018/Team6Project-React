import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTreatments } from "./data/TreatmentData";
import { createSetTreatment } from "redux/treatment-reducer";
import TreatmentItem from "./components/TreatmentItem";

function PatientTreatment(props) {

  console.log("PatientTreatment");
  const [patientTreatments, setPatientTreatments] = useState([]);

  useEffect(() => {
    setPatientTreatments(getTreatments(props.selectedPatient.patientid));
    console.log("PatientTreatment 데이터 가져옴")
  }, [props.selectedPatient])

  const selectTreatment = useCallback((treatment) => {
    props.selectTreatment(treatment);
  }, [props])

  return (
    <>
      <div className="row d-flex justify-content-between"style={{backgroundColor:"#FFFFFF", paddingLeft:"15px", paddingRight:"15px"}}>
        <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#887BD2", width:"40px", color:"#FFFFFF"}}><i className="bi bi-calendar2-check"></i></div><div className="d-flex align-items-center">진료 내역</div></div>
        <div className="d-flex align-items-center pb-1" style={{height:"50px", width:"250px"}}>선택한 진료: {props.treatment.treatmentdate}</div>
      </div>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        {
        patientTreatments !=null &&
        patientTreatments.map (treatment => {
        return (
          <TreatmentItem key={treatment.treatmentid} item={treatment} property={["treatmentdate", "state"]} onClick={selectTreatment}></TreatmentItem>
        );
        })}
      </div>
    </>
  );
}

export default PatientTreatment;




// selectedTreatment.treatmentid === treatment.treatmentid ?  {cursor:"pointer", backgroundColor:"#38B2AC"} : 