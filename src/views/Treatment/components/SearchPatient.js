import { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Item from "views/components/Item";
import { getAllPatients, getPatients, getSearchPatients } from "../data/PatientData";
function SearchPatient(props) {
  const property = ["patientid", "patientname", "age", "sex", "phonenumber", "lasttreatment", "registerday"];

  const [checkedPatient, setCheckedPatient] = useState({
    patientname:"", 
    ssn1:"-", 
    ssn2:"-", 
    sex: "성별",
    age:"-",
    phonenumber: "-", 
  });
  const [searchName, setSearchName] = useState("");
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    setPatientList(getAllPatients());
  }, [])

  useEffect(() => {
    setCheckedPatient({
      patientname:"", 
      ssn1:"-", 
      ssn2:"-", 
      sex: "성별",
      age:"-",
      phonenumber: "-", 
    })
  }, [props.show])

  const checkPatient = (patient) => {
    setCheckedPatient(patient);
    console.log(patient);
  }

  const selectedComplete = (patient) => {
    props.selectPatient(patient); 
    props.handleClose();
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const search = useCallback((name) => {
    const loadPatient = getSearchPatients(name);
    setPatientList(loadPatient);
    console.log(name);
  }, []);//useCallback로 받으면 () =>      ()괄호안에 매개변수를 받아야함

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>환자 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input type="text" onChange={handleSearchName}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={ () => search(searchName)}>검색</button>
            </div>
          </div>
          <div className="d-flex">
            <div style={{fontWeight:"bold"}}>현재 선택한 환자: </div>
            {checkedPatient.patientname}
          </div>
          <div style={{height:"400px"}} className="overflow-auto pt-1">
            {patientList.map ( patient => {
              return (
                <Item key={patient.patientid}  item={patient} property={property} onClick={checkPatient}></Item>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={props.handleClose}>
            닫기
          </Button>
          <Button variant="outline-success" size="sm" onClick={() => { selectedComplete(checkedPatient) } }>
            선택 완료
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchPatient;

