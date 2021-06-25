import { Accordion, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ButtonHeader from "./components/ButtonHeader";
import PackageTest from "./components/PackageTest";
import { getTests } from "./data/Data";

function TestList(props) {


  return (
    <>
      <ButtonHeader headertitle="검사 목록" iclassName="bi bi-droplet" color="#E89677" btnicon="bi bi-plus-square" buttonname="검색"/>
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