import { Accordion, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ButtonHeader from "./components/ButtonHeader";
import PackageTest from "./components/PackageTest";
import { getTests } from "./data/Data";

function TestList(props) {

  const selectedTreatment = useSelector((state) => {
    return state.treatmentReducer.treatment;
  });

  const tests = getTests(selectedTreatment.treatmentid);
  console.log(tests);
  return (
    <>
      <ButtonHeader headertitle="검사 목록" iclassName="bi bi-droplet" color="#E89677" buttonname="검색"/>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        <PackageTest/>
      </div>
    </>
  );
}

export default TestList;