import { getPatientList } from "apis/Treatment";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AutoSizer, List } from "react-virtualized";
import Item from "views/components/Item";
import PatientItem from "./PatientItem";
function SearchPatient(props) {
  const property = ["patientid", "patientname", "age", "sex", "phonenumber", "lasttreatment", "registerday"];

  const [checkedPatient, setCheckedPatient] = useState({
    patientname:"환자이름", 
    ssn1:"", 
    ssn2:"", 
    sex: "성별",
    age:"-",
    phonenumber: "-", 
  });
  const [searchName, setSearchName] = useState("");
  const [patientList, setPatientList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const work = async() => {
      try {
        setLoading(true);
        const response = await getPatientList();
        setPatientList(response.data);
        setSearchList(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    work();
  }, [])

  useEffect(() => {
    setCheckedPatient({
      patientname:"환자이름", 
      ssn1:"", 
      ssn2:"", 
      sex: "성별",
      age:"-",
      phonenumber: "-", 
    })
    setSearchList(patientList);
    setSearchName("");
  }, [props.show, patientList])

  const checkPatient = (patient) => {
    setCheckedPatient(patient);
  }

  const selectedComplete = (patient) => {
    props.selectPatient(patient); 
    props.handleClose();
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const search = useCallback((name, patientList) => {
    setSearchList(() => {
      const newPatient = patientList.filter(patient => patient.patientname.indexOf(name) !== -1);
      return newPatient;
    })
  }, []);//useCallback로 받으면 () =>      ()괄호안에 매개변수를 받아야함

  const rowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <PatientItem item={searchList[index]} property={property} onClick={checkPatient} selected={checkedPatient.patientid}></PatientItem>
      </div>
    )
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton style={{backgroundColor:"#1B296D"}}>
          <Modal.Title style={{color:"#FFFFFF"}}>환자 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input type="search" value={searchName} onChange={handleSearchName} style={{width:"300px"}}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={ () => search(searchName, patientList)}>검색</button>
            </div>
          </div>
          <div className="d-flex">
            <div style={{fontWeight:"bold"}}>현재 선택한 환자:  </div>
            {checkedPatient.patientname}
          </div>
          <div style={{height:"400px"}} className="overflow-auto pt-1">
            {
              loading === true ? 
              <div className="d-flex h-100 justify-content-center align-items-center">
                <div class="spinner-border text-success" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              :
              <AutoSizer>
                {
                  ({width, height}) => {
                    return (
                      <List width={width} height={height}
                        rowCount={searchList.length}
                        rowHeight={50}
                        rowRenderer={rowRenderer}
                        overscanRowCount={5}
                      />
                    )
                  }
                }
              </AutoSizer>
              // searchList.map ( patient => {
              //   return (
              //     <Item key={patient.patientid}  item={patient} property={property} onClick={checkPatient}></Item>
              //   );
              // })
            }
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

