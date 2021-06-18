import { useState } from "react";
import Chart from "./Chart";
import PeriodSearch from "./PeriodSearch";
import TestGroup from "./TestGroup";
import TestHeader from "./TestHeader";
import TestResult from "./TestResult";
import TestList from "./TestWaitingList";

function TestPage(props) { 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setState] = useState("대기");
  const [waitState, setWaitState] = useState("대기");
  const handleWaitState = (e) => {
    const { value } = e.target;
    setWaitState(value);
    
    if (value === "검사시작") {
      let state = "진행중";
      setState(state);
      console.log(state)
    }
    if (value === "바코드출력") {
      let state = "진행중";
      setState(state);
      console.log(state)
    }
    if (value === "접수취소") {
      let state = "대기중";
      setState(state);
      console.log(state)
    }
    if (value === "검사완료") {
      let state = "완료";
      setState(state);
      console.log(state)
    }
  };

  return (
    <div className="100vh" style={{minWidth:"1000px"}}>
      <div className="row m-0">
        <div className="col-6 mt-5">
          <PeriodSearch/>
          <Chart/>
          <div className="text-right"><button className="btn btn-sm btn-dark mb-2 mt-3" onClick={handleShow}>검사 이력 조회 및 결과 입력</button></div>
          <TestResult show={show} handleClose={handleClose} />
          <div>
            <TestHeader/>
            <TestList/>
          </div>
        </div>
        <div className="col-6">
        <div className="mt-5 mb-1 text-right">
          <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleWaitState } value="검사시작">검사시작</button>
          <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleWaitState } value="바코드출력">바코드출력</button>
          <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleWaitState } value="접수취소">접수취소</button>
          <button type="button" className="btn btn-dark btn-sm mr-1">엑셀저장</button>
          <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleWaitState } value="검사완료">검사완료</button>
        </div>
        <TestGroup state={state}/>
        </div>
      </div> 
    </div>
  );
}
export default TestPage;