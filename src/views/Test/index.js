import { useEffect, useState } from "react";
import Banner from "./Banner";
import Chart from "./Chart";
import PeriodSearch from "./PeriodSearch";
import TestGroup from "./TestGroup";
import TestResult from "./TestResult";
import TestWaitingHeader from "./TestWaitingHeader";
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
  // const handleStart = (e) => {
  //   const { value } = e.target;
  //   if (value === "검사시작") {
  //     console.log("vv", value)
  //     let change = 
  //       {label:"primary", state: "진행중"}
  //     ;
  //     setState(change);
  //   }
  // };
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
      <div className="col-3 mt-5" style={{borderRight:"1px solid #dadada"}}>
          <div className="row pl-2" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#FF8C64"}}><i class="bi bi-calendar4-week" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">검사 대기 목록</div></div>
          <div style={{height:"88vh"}}>
          <PeriodSearch/>
          <TestWaitingHeader/>
          <TestWaitingList/>
          </div>
        </div>
        <div className="col-4 mt-5" style={{borderRight:"1px solid #dadada"}}>
          <div>
          <div className="row pl-2" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#F2E18D"}}><i class="bi bi-droplet" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">검사 처방 목록</div></div>
            <div className="mt-4 mb-2 text-right">
              <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handlePrint } value="바코드출력">바코드출력</button>
              <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleCancel } value="접수취소">접수취소</button>
              <button type="button" className="btn btn-dark btn-sm mr-1">엑셀저장</button>
              <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleFinish } value="검사완료">검사완료</button>
            </div>
            <div>
              <TestGroup state={state}/>
            </div>
          </div>
        </div>
        <div className="col-5 mt-5">
          <div>
          <div className="row pl-2" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#3EB2A2"}}><i class="bi bi-display" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">과거 검사 및 결과 입력</div></div>

          </div>
        </div>

      </div> 
    </div>
  );
}
export default TestPage;