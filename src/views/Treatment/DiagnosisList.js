import { useState } from "react";
import ButtonHeader from "./components/ButtonHeader";
import DiagnosesItem from "./components/Diagnoses/DiagnosesItem";
import PrescriptionDiagnosesModal from "./components/Diagnoses/PrescriptionDiagnosesModal";


function DiagnosisList(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const info = () => {
    alert("진료중인 진료를 선택해주세요.");
  }
  const prescribeDiagnoses =  (prescriptionItems) => {
    props.prescribeDiagnoses(prescriptionItems);
  }

  return (
    <>
      <ButtonHeader headertitle="상병 목록" iclassName="bi bi-check2-square" color="#D27E7B" btnicon="bi bi-plus-square" onclick={props.treatment.status==="진료중"? handleShow : info}/>
      <PrescriptionDiagnosesModal show={show} treatment={props.treatment} handleClose={handleClose} staticItemList={props.staticDignoses} itemList={props.treatmentDiagnoses} prescribe={prescribeDiagnoses}></PrescriptionDiagnosesModal>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>

      
      {
        props.treatment.treatmentid == null ? 
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div style={{textAlign:"center", color:"#999999", marginTop:"2px"}}><div><i class="bi bi-folder-check" style={{fontSize:"100px"}}></i></div><div style={{fontSize:"16px"}}>진료를 선택해주세요.</div></div>
        </div>
        :
        (
          props.loading === true ? 
          <div className="d-flex h-100 justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
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
              <div style={{textAlign:"center", color:"#999999", marginTop:"2px"}}><div><i class="bi bi-plus-square" style={{fontSize:"100px"}}></i></div><div style={{fontSize:"16px"}}>처방 받은 내역이 없습니다.</div></div>
            </div>
          )
        )
      }
      </div>

      
    </>
  );
}

export default DiagnosisList;