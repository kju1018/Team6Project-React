
import { useState } from "react";
import Item from "views/components/Item";
import PrescriptionModal from "./components/PrescriptionDrugsModal"
import ButtonHeader from "./components/ButtonHeader";

function DrugList(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const info = () => {
    alert("대기중인 진료를 선택해주세요.");
  }

  const prescribeDrugs = (prescriptionItems) => {
    props.prescribeDrugs(prescriptionItems);
  }
  return (
    <>
    <ButtonHeader headertitle="처방약 목록" iclassName="bi bi-bag-plus" color="#FFCD82" btnicon="bi bi-plus-square" buttonname="검색" onclick={props.treatment.state==="진료 대기"? handleShow : info}/>
    <PrescriptionModal show={show} handleClose={handleClose} staticItemList={props.staticDrugs} itemList={props.treatmentDrugs} prescribe={prescribeDrugs}></PrescriptionModal>
    <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>
      {props.treatmentDrugs !=null &&
      props.treatmentDrugs.map (drug => {
          return (
            <Item key={drug.drugid} item={drug}></Item>
          );
      })}
    </div>
    </>


  );
}

export default DrugList;