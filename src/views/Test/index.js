import { useEffect, useState } from "react";
import Banner from "./Banner";
import Chart from "./Chart";
import PeriodSearch from "./PeriodSearch";
import TestGroup from "./TestGroup";
import TestResult from "./TestResult";
import TestWaitingHeader from "./TestWaitingHeader";
import TestWaitingList from "./TestWaitingList";

function TestPage(props) { 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <TestGroup/>
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