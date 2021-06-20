import { Accordion, Card } from "react-bootstrap";
import ButtonHeader from "./components/ButtonHeader";
import PackageTest from "./components/PackageTest";

function TestList(props) {

  return (
    <>
      <ButtonHeader headertitle="검사 목록" buttonname="검색"/>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        <PackageTest/>
      </div>
    </>
  );
}

export default TestList;