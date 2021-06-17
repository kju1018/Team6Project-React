import { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";


import Item from "views/components/Item";
import PrescriptionHeader from "./components/PrescriptionHeader";



function PatientWaiting(props) {

  const [listtype, setListtype] = useState("wait");

  const handleChange = (event) => {
    setListtype(event.target.value);
  }

  return (
    <>
    <PrescriptionHeader headertitle="환자 리스트" buttonname="환자 검색"/>
    <div>
    <ButtonGroup toggle>
      <ToggleButton type="radio" variant={`${listtype === "wait" ? "secondary" : "light" }`} name="type"  checked={listtype==="wait"} value="wait" onChange={handleChange}><div className="ml-5 mr-5">대기</div></ToggleButton>
      <ToggleButton type="radio" variant={`${listtype === "complete" ? "secondary" : "light" }`} name="type"  checked={listtype==="complete"} value="complete" onChange={handleChange}><div className="ml-5 mr-5">완료</div></ToggleButton>
    </ButtonGroup>
    </div>

    <div className={`overflow-auto p-3`} style={{height:"calc(100% - 80px)"}}>
      <Item/>
    </div>
    </>
  );
}

export default PatientWaiting;