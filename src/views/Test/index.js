import { useState } from "react";
import PeriodSearch from "./PeriodSearch";
import TestGroup from "./TestGroup";
import TestResult from "./TestResult";
import { Nav, Row, Tab, Badge } from "react-bootstrap";
import {getAllPatient, waitingPatient, progressPatient, completePatient, testDate, testList } from "./data/patient"

function TestPage(props) {  
  let list=[];
  const [show, setShow] = useState(false);
  const [testreceptions, setTestReception] = useState(testDate())
  const [clickdate, setClickDate] = useState(list);
  const [profile, setProfile] = useState({});
  const [patient, setPatient] = useState(getAllPatient())
  const [waiting, setWaiting] = useState(waitingPatient())
  const [progress, setProgress] = useState(progressPatient())
  const [complete, setComplete] = useState(completePatient())
  const [groupshow, setGroupShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  const ClickPatient = (e, index, item) => {
    const reset = false;
    setGroupShow(reset)
    const lists = [];
    for(var i=0; i<testreceptions.length; i++){
      const newpatientid = testreceptions[i];
      if(newpatientid.patientid === item.patientid){
        lists.push(newpatientid);  
      }
    }  
    setClickDate(lists)
    setProfile(item)
  }

  
  const ClickDate = (e, index, item) => {  
    
    const value = !groupshow
    setGroupShow(value)
  }
  
  return (
    <div className="vh-100" style={{minWidth:"1000px"}}>
      <div className="row m-0">
      <div className="col-3 pt-3" style={{borderRight:"1px solid #dadada"}}>
          <div className="row pl-3 ml-0" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#FF8C64"}}><i class="bi bi-calendar4-week" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">검사 대기 목록</div></div>
          <div style={{height:"88vh"}}>
          <PeriodSearch/>
          <Tab.Container id="left-tabs-example" defaultActiveKey="wait">
            <Nav fill variant="tabs" className="flex-column mb-2">
              <Row className="ml-0 mr-0">
                <Nav.Item>
                  <Nav.Link eventKey="total">전체<diV>{patient.length}</diV></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="wait">대기<diV>{waiting.length}</diV></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="progress">진행중<diV>{progress.length}</diV></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="complete">완료<diV>{complete.length}</diV></Nav.Link>
                </Nav.Item>
              </Row>
            </Nav>

          <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ backgroundColor:"#ffffff", boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
            <div className="col-2 p-0 pt-1 pb-1 text-center">차트번호</div>
            <div className="col-3 p-0 text-center">생년월일</div>
            <div className="col-1 p-0 text-center">성별</div>
            <div className="col-3 p-0 text-center">이름</div>
            <div className="col-3 p-0 text-center">상태</div>
          </div>

          <Tab.Content className="overflow-auto">
              <Tab.Pane eventKey= "total" className="pt-1">
              {patient.map((item,index)=>{return(
                <div className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ e => {ClickPatient(e, index, item) }} style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">{patient[index].patientid}</div>
                <div className="col-3 p-0 text-center">{patient[index].ssn1}</div>
                <div className="col-1 p-0 text-center">{patient[index].sex}</div>
                <div className="col-3 p-0 text-center">{patient[index].patientname}</div>
                <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="success">{patient[index].state}</Badge><Badge variant="danger">미입력</Badge></div>
              </div>
              )})}
              </Tab.Pane>
              <Tab.Pane eventKey= "wait" className="pt-1">
              {waiting.map((item,index)=>{return(
                <div className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ e => {ClickPatient(e, index, item) }} style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">{waiting[index].patientid}</div>
                <div className="col-3 p-0 text-center">{waiting[index].ssn1}</div>
                <div className="col-1 p-0 text-center">{waiting[index].sex}</div>
                <div className="col-3 p-0 text-center">{waiting[index].patientname}</div>
                <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="success">{waiting[index].state}</Badge><Badge variant="danger">미입력</Badge></div>
              </div>
              )})}
              </Tab.Pane>
              <Tab.Pane eventKey= "progress" className="pt-1">
              {progress.map((item,index)=>{return(
                <div className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ e => {ClickPatient(e, index, item) }} style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">{progress[index].patientid}</div>
                <div className="col-3 p-0 text-center">{progress[index].ssn1}</div>
                <div className="col-1 p-0 text-center">{progress[index].sex}</div>
                <div className="col-3 p-0 text-center">{progress[index].patientname}</div>
                <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="success">{progress[index].state}</Badge><Badge variant="danger">미입력</Badge></div>
              </div>
              )})}
              </Tab.Pane>
              <Tab.Pane eventKey= "complete" className="pt-1">
              {complete.map((item,index)=>{return(
                <div className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ e => {ClickPatient(e, index, item) }} style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">{complete[index].patientid}</div>
                <div className="col-3 p-0 text-center">{complete[index].ssn1}</div>
                <div className="col-1 p-0 text-center">{complete[index].sex}</div>
                <div className="col-3 p-0 text-center">{complete[index].patientname}</div>
                <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="success">{complete[index].state}</Badge><Badge variant="danger">미입력</Badge></div>
              </div>
              )})}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          </div>
        </div>
        <div className="col-5 pt-3">
          <div className="d-flex pl-3 ml-0 mb-3 p-0" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#F2E18D"}}><i class="bi bi-droplet" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">검사 처방 목록</div></div>
          <div className="d-flex align-items-center pl-3 pr-3" style={{ backgroundColor:"#ffffff", boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px", height:"40px"}}>
            <div className="col p-0 pt-1 pb-1 text-center">차트번호 :</div>
            <div className="col p-0 pt-1 pb-1 text-center border-right">{profile.patientid}</div>
            <div className="col p-0 pt-1 pb-1 text-center">생년월일 :</div>
            <div className="col p-0 pt-1 pb-1 text-center border-right">{profile.ssn1}</div>
            <div className="col p-0 pt-1 pb-1 text-center">성별 :</div>
            <div className="col p-0 pt-1 pb-1 text-center border-right">{profile.sex}</div>
            <div className="col p-0 pt-1 pb-1 text-center">이름 :</div>
            <div className="col p-0 pt-1 pb-1 text-center">{profile.patientname}</div>
          </div>
            <div className="d-flex pt-3">
              <div style={{width:"18%", marginRight:"3%", marginLeft:"2%"}}>
                <div className="mb-3">검사 날짜: </div>
                <div>   
                  {clickdate.map((item,index)=>{return(   
                  <div className="pt-2 pb-2 mb-2 align-items-center" onClick={ e => { ClickDate(e, index, item) }} style={{border:"1px solid #dadada", borderRadius:"15px", textAlign:"center", backgroundColor:"#ffffff"}}>
                  <div>{clickdate[index].testdate}</div>
                  </div>
                  )})}
                </div>
              </div>
              <div style={{width:"75%", marginRight:"2%"}}><div>검사 목록: </div>{groupshow?<TestGroup/>:""}</div>
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