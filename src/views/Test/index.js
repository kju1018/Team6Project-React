import { useState } from "react";
import Banner from "./Banner";
import PeriodSearch from "./PeriodSearch";
import TestDateList from "./TestDateList";
import TestGroup from "./TestGroup";
import TestResult from "./TestResult";
import { Nav, Row, Tab, Badge } from "react-bootstrap";

function TestPage(props) { 
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const TestDate = () => {
    const change = !date
    setDate(change);
  }

  return (
    <div className="100vh" style={{minWidth:"1000px"}}>
      <div className="row m-0">
      <div className="col-3 pt-3" style={{borderRight:"1px solid #dadada"}}>
          <div className="row pl-3 ml-0" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#FF8C64"}}><i class="bi bi-calendar4-week" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">검사 대기 목록</div></div>
          <div style={{height:"88vh"}}>
          <PeriodSearch/>
          <Tab.Container id="left-tabs-example" defaultActiveKey="wait">
            <Nav fill variant="tabs" className="flex-column mb-2">
              <Row className="ml-0 mr-0">
                <Nav.Item>
                  <Nav.Link eventKey="total">전체<diV>12</diV></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="wait">대기<diV>4</diV></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="progress">진행중<diV>2</diV></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="complete">완료<diV>40</diV></Nav.Link>
                </Nav.Item>
              </Row>
            </Nav>
            <Tab.Content className="overflow-auto">
            </Tab.Content>
          </Tab.Container>

          <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ backgroundColor:"#ffffff", boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
            <div className="col-2 p-0 pt-1 pb-1 text-center">순서</div>
            <div className="col-3 p-0 text-center">번호</div>
            <div className="col-2 p-0 text-center">성별/나이</div>
            <div className="col-2 p-0 text-center">이름</div>
            <div className="col-3 p-0 text-center">상태</div>
          </div>
          <div className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ TestDate } style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
              <div className="col-2 p-0 pt-1 pb-1 text-center">1</div>
              <div className="col-3 p-0 text-center">13232</div>
              <div className="col-2 p-0 text-center">F/29</div>
              <div className="col-2 p-0 text-center">이연정</div>
              <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="success">대기중</Badge><Badge variant="danger">미입력</Badge></div>
            </div>
            <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
              <div className="col-2 p-0 pt-1 pb-1 text-center">1</div>
              <div className="col-3 p-0 text-center">13332</div>
              <div className="col-2 p-0 text-center">M/26</div>
              <div className="col-2 p-0 text-center">봉상근</div>
              <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="primary">진행중</Badge><Badge variant="danger">미입력</Badge></div>
            </div>
            <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
              <div className="col-2 p-0 pt-1 pb-1 text-center">1</div>
              <div className="col-3 p-0 text-center">12132</div>
              <div className="col-2 p-0 text-center">M/27</div>
              <div className="col-2 p-0 text-center">오원재</div>
              <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="danger">완료</Badge><Badge variant="danger">미입력</Badge></div>
            </div>
            <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
              <div className="col-2 p-0 pt-1 pb-1 text-center">1</div>
              <div className="col-3 p-0 text-center">13362</div>
              <div className="col-2 p-0 text-center">M/27</div>
              <div className="col-2 p-0 text-center">김민석</div>
              <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="primary">완료</Badge><Badge variant="danger">미입력</Badge></div>
            </div>
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

          <div className="row" style={{height:"2%"}}>      
          </div>
          <div style={{height:"65%"}}><TestResult/></div>

          <div style={{height:"10%"}}>
          
          </div>
        </div>

      </div> 
    </div>
  );
}
export default TestPage;