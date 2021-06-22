import { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSetPatient } from "redux/patient-reducer";
import Item from "views/components/Item";
import { getPatients } from "../data/PatientData";

function ReceptionContents(props) {

  const property = ["patientid", "patientname", "sex", "state"];
  const patientList = getPatients(props.type);

  const dispatch = useDispatch();
  const loadPatient = (patient) => {
    dispatch(createSetPatient(patient));
  }

  useEffect(() => {
    console.log("리렌더링ㅇ")
  }, [props]);

  return (
    <Tab.Pane eventKey={props.eventKey} className="pt-1">
      {
      patientList.map (patient => {
        return (
          <Item onClick={loadPatient} item={patient} property={property}></Item>
        );
      })}
    </Tab.Pane>
  );
}

export default ReceptionContents;