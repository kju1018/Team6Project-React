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


  return (
    <Tab.Pane eventKey={props.eventKey} className="pt-1">
      {patientList.map (patient => {
        return (
          <div key={patient.patientid} onClick={() => loadPatient(patient)} style={{cursor:"pointer"}}>
            <Item item={patient} property={property}></Item>
          </div>
        );
      })}
    </Tab.Pane>
  );
}

export default ReceptionContents;