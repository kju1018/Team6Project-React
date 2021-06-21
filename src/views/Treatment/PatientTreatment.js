import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "views/components/Item";
import { getTreatments } from "./data/TreatmentData";
import { createSetTreatment } from "redux/treatment-reducer";

function PatientTreatment(props) {

  const dispatch = useDispatch();

  const selectedPatient = useSelector((state) => {
    return state.patientReducer.patient;
  });

  const selectedTreatment = useSelector((state) => {
    return state.treatmentReducer.treatment;
  });

  const patientTreatments = getTreatments(selectedPatient.patientid);

  const selectTreatment = (treatment) => {
    dispatch(createSetTreatment(treatment));
  }

  useEffect(() => {
    dispatch(createSetTreatment({}));
  }, [dispatch ,selectedPatient])

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center" style={{height:"50px"}}><i className="bi bi-calendar2-check mr-1"></i>진료 내역</div>
        <div className="d-flex align-items-center" style={{height:"50px"}}>선택한 진료: {selectedTreatment.treatmentdate}</div>
      </div>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        {patientTreatments.map (treatment => {
        return (
          <Item key={treatment.treatmentid} item={treatment} property={["treatmentdate"]} onClick={selectTreatment}></Item>
        );
        })}
      </div>
    </>
  );
}

export default PatientTreatment;




// selectedTreatment.treatmentid === treatment.treatmentid ?  {cursor:"pointer", backgroundColor:"#38B2AC"} : 