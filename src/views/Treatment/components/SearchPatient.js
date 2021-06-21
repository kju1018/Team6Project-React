import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Item from "views/components/Item";
import { getAllPatients, getPatients, getSearchPatients } from "../data/PatientData";
function SearchPatient(props) {
  const property = ["patientid", "patientname", "age", "sex", "phonenumber", "lasttreatment", "registerday"];

  const [checkPatient, setCheckPatient] = useState({});
  const [searchName, setSearchName] = useState("");
  const [patientList, setPatientList] = useState(getAllPatients());

  const selectPatient = (patient) => {
    setCheckPatient(patient);
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
    console.log(searchName);
  };

  const search = () => {
    const loadPatient = getSearchPatients(searchName);
    setPatientList(loadPatient);
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>환자 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input type="text" onChange={handleSearchName}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={search}>검색</button>
            </div>
          </div>
          <div style={{height:"400px"}} className="overflow-auto pt-1">
            {patientList.map ( patient => {
              return (
                <Item key={patient.patientid}  item={patient} property={property} onClick={selectPatient}></Item>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={props.handleClose}>
            닫기
          </Button>
          <Button variant="outline-success" size="sm" onClick={() => { props.loadPatient(checkPatient); props.handleClose(); } }>
            환자 선택
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchPatient;

