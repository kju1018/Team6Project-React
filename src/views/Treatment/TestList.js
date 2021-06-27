import { useState } from "react";
import ButtonHeader from "./components/ButtonHeader";
import PackageTest from "./components/PackageTest";
import PrescriptionTestsModal from "./components/PrescriptionTestsModal";

function TestList(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const info = () => {
    alert("대기중인 진료를 선택해주세요.");
  }

  const prescribeTests = (prescriptionItems) => {
    props.prescribeTests(prescriptionItems);
  }

  return (
    <>
      <ButtonHeader headertitle="검사 목록" iclassName="bi bi-droplet" color="#E89677" btnicon="bi bi-plus-square" onclick={props.treatment.state==="진료 대기"? handleShow : info}/>
      <PrescriptionTestsModal show={show} handleClose={handleClose} staticItemList={props.staticTests} itemList={props.treatmentTests} prescribe={prescribeTests}></PrescriptionTestsModal>
      {props.treatment.treatmentid != null && props.treatment.state==="진료 완료"?  
        <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
          <PackageTest/>
        </div>
      :
      null
      }

    </>
  );
}

export default TestList;