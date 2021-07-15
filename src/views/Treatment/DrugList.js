
import { useState } from "react";

import PrescriptionModal from "./components/PrescriptionDrugsModal"
import ButtonHeader from "./components/ButtonHeader";
import DrugsItem from "./components/DrugsItem";

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
    <ButtonHeader headertitle="처방약 목록" iclassName="bi bi-bag-plus" color="#FFCD82" btnicon="bi bi-plus-square" onclick={props.treatment.status==="진료 대기"? handleShow : info}/>
    <PrescriptionModal show={show} treatment={props.treatment} handleClose={handleClose} staticItemList={props.staticDrugs} itemList={props.treatmentDrugs} prescribe={prescribeDrugs}></PrescriptionModal>
    <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>
      {
        props.treatment.treatmentid == null ? 
        <div className="h-100 d-flex align-items-center justify-content-center">
          진료를 선택해주세요.
        </div>
        :
        ( 
          props.loading === true ? 
          <div class="d-flex h-100 justify-content-center align-items-center">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          :
          ( 
            props.treatmentDrugs.length !== 0 ?
          
            props.treatmentDrugs !=null &&
            props.treatmentDrugs.map (drug => {
              return (
                <DrugsItem key={drug.drugid} item={drug}></DrugsItem>
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

export default DrugList;