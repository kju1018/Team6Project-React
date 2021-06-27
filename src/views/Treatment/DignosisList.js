import { useState } from "react";
import ButtonHeader from "./components/ButtonHeader";
import DignosesItem from "./components/DignosesItem";
import PrescriptionDignosesModal from "./components/PrescriptionDignosesModal";


function DiagnosisList(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const info = () => {
    alert("대기중인 진료를 선택해주세요.");
  }

  const prescripbeDiagnoses =  (prescriptionItems) => {
    props.prescripbeDiagnoses(prescriptionItems);
  }

  return (
    <>
      <ButtonHeader headertitle="상병 목록" iclassName="bi bi-check2-square" color="#D27E7B" btnicon="bi bi-plus-square" onclick={props.treatment.state==="진료 대기"? handleShow : info}/>
      <PrescriptionDignosesModal show={show} handleClose={handleClose} staticItemList={props.staticDignoses} itemList={props.treatmentDiagnoses} prescribe={prescripbeDiagnoses}></PrescriptionDignosesModal>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>
      {props.treatmentDiagnoses.map (diagnosis => {
          return (
            <DignosesItem key={diagnosis.diagnosesdataid} item={diagnosis}></DignosesItem>
          );
      })}
      </div>

      
    </>
  );
}

export default DiagnosisList;