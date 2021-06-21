import { useEffect, useState } from "react";
import Banner from "./Banner";
import Chart from "./Chart";
import PeriodSearch from "./PeriodSearch";
import TestGroup from "./TestGroup";
import TestHeader from "./TestHeader";
import TestResult from "./TestResult";
import TestWaitingList from "./TestWaitingList";

function TestPage(props) { 
  const object = {label:"success", state: "대기중"};
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setState] = useState(object);
  console.log("렌더링")
  useEffect(()=>{
    console.log("hi2")
    console.log(state)
  },[state])
  const handleStart = (e) => {
    const { value } = e.target;
    if (value === "검사시작") {
      console.log("vv", value)
      let change = 
        {label:"primary", state: "진행중"}
      ;
      setState(change);
    }
  };
  const handlePrint = (e) => {
    const { value } = e.target;
    if (value === "바코드출력") {
      let change = 
        {label:"primary", state: "진행중"}
      ;
      setState(change);
    }
  };
  const handleCancel = (e) => {
    const { value } = e.target;
    if (value === "접수취소") {
      let change = 
        {label:"success", state: "대기중"}
      ;
      setState(change);
    }
  };
  const handleFinish = (e) => {
    const { value } = e.target;
    if (value === "검사완료") {
      let change = 
        {label:"danger", state: "완료"}
      ;
      setState(change);
    }
  };

  return (
    <div className="100vh" style={{minWidth:"1000px"}}>
      <div className="row m-0">
        <div className="col-6 mt-5">
          <PeriodSearch/>
          <Chart/>
          <div className="text-right"><button className="btn btn-sm btn-dark mb-2 mt-4" onClick={handleShow}>검사 이력 조회 및 결과 입력</button></div>
          <TestResult show={show} handleClose={handleClose} />
          <div>
            <TestHeader/>
            <TestWaitingList/>
          </div>
        </div>
        <div className="col-6">
          <div style={{height:"660px"}}>
            <div className="mt-5 mb-1 text-right">
              <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleStart } value="검사시작">검사시작</button>
              <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handlePrint } value="바코드출력">바코드출력</button>
              <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleCancel } value="접수취소">접수취소</button>
              <button type="button" className="btn btn-dark btn-sm mr-1">엑셀저장</button>
              <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleFinish } value="검사완료">검사완료</button>
            </div>
            <div className="overflow-auto" style={{height:"600px"}}>
              <TestGroup state={state}/>
            </div>
          </div>
        <div className="text-center" style={{border: "solid 1px #BDBDBD", height:"205px", marginBottom:"5px"}}><Banner/></div>
        </div>
      </div> 
    </div>
  );
}
export default TestPage;