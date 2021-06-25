import { useEffect, useState } from "react";
import Banner from "./Banner";
import PeriodSearch from "./PeriodSearch";
import TestDateList from "./TestDateList";
import TestGroup from "./TestGroup";
import TestWaitingHeader from "./TestWaitingHeader";
import TestWaitingList from "./TestWaitingList";

function TestPage(props) { 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="100vh" style={{minWidth:"1000px"}}>
      <div className="row m-0">
      <div className="col-3 pt-3" style={{borderRight:"1px solid #dadada"}}>
          <div className="row pl-3 ml-0" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#FF8C64"}}><i class="bi bi-calendar4-week" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">검사 대기 목록</div></div>
          <div style={{height:"88vh"}}>
          <PeriodSearch/>
          <TestWaitingHeader/>
          <TestWaitingList/>
          </div>
        </div>
        <div className="col-5 pt-3">
          <div className="row pl-3 ml-0" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#F2E18D"}}><i class="bi bi-droplet" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">검사 처방 목록</div></div>
            <div className="row pt-3">
              <div style={{width:"18%", marginRight:"3%", marginLeft:"2%"}}><div className="mb-3">검사 날짜: </div><TestDateList/></div>
              <div style={{width:"75%", marginRight:"2%"}}><div>검사 목록: </div><TestGroup/></div>
            </div>
        </div>
        <div className="col-4 pt-3" style={{borderLeft:"1px solid #dadada"}}>
          <div className="row pl-3 10vh ml-0" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#3EB2A2"}}><i class="bi bi-display" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">결과 입력</div></div>
          <div className="row" style={{height:"70%"}}>      
            <div className="col-9 pt-3"><div>검사 결과: </div></div>
          </div>
          <div style={{height:"10%"}}>
            <Banner/>
          </div>
        </div>

      </div> 
    </div>
  );
}
export default TestPage;