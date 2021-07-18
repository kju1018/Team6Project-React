import { useState } from "react";
import ButtonHeader from "./components/ButtonHeader";
import DiagnosesItem from "./components/Diagnoses/DiagnosesItem";
import PrescriptionDiagnosesModal from "./components/Diagnoses/PrescriptionDiagnosesModal";


function DiagnosisList(props) {
  console.log("DiagnosisList");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const info = () => {
    alert("대기중인 진료를 선택해주세요.");
  }
  const prescribeDiagnoses =  (prescriptionItems) => {
    props.prescribeDiagnoses(prescriptionItems);
  }

  return (
    <>
      <ButtonHeader headertitle="상병 목록" iclassName="bi bi-check2-square" color="#D27E7B" btnicon="bi bi-plus-square" onclick={props.treatment.status==="진료 대기"? handleShow : info}/>
      <PrescriptionDiagnosesModal show={show} treatment={props.treatment} handleClose={handleClose} staticItemList={props.staticDignoses} itemList={props.treatmentDiagnoses} prescribe={prescribeDiagnoses}></PrescriptionDiagnosesModal>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>

      
      {
        props.treatment.treatmentid == null ? 
        <div className="h-100 d-flex align-items-center justify-content-center">
          진료를 선택해주세요.
        </div>
        :
        (
          props.loading === true ? 
          <div className="d-flex h-100 justify-content-center align-items-center">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          :
          (
            props.treatmentDiagnoses.length !==0 ? 
            props.treatmentDiagnoses.map (diagnosis => {
              return (
                <DiagnosesItem key={diagnosis.diagnosesdataid} item={diagnosis}></DiagnosesItem>
              );
            })
            :
            <div className="h-100 d-flex align-items-center justify-content-center">
              처방 받은 내역이 없습니다.
            </div>
          )
        )
      }
      </div>

      
    </>
  );
}

export default DiagnosisList;