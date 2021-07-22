import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PeriodSearch from "./PeriodSearch";
import TestGroup from "./TestGroup";
import TestResult from "./TestResult";
import { Nav, Row, Tab, Badge } from "react-bootstrap";
import { testlistByDate, testlistByReceptionid } from "apis/test";
import moment from 'moment';

function TestPage(props) {  
  console.log("리렌더링")
  const [patients, setPatient] = useState([]) //전체 환자
  const [waitings, setWaiting] = useState([]) //대기 환자
  const [progresss, setProgress] = useState([]) //진행 환자
  const [completes, setComplete] = useState([]) //완료 환자

  const [selectpatientinfo, setSelectpatientinfo] = useState({}) //클릭한 검사접수번호의 환자의 정보
 
  const [groupshow, setGroupShow] = useState(false) //testgroup 보여주는 show
 
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());

  const [testdatas, setTestdatas] = useState([]);

  const testReception = useSelector((state)=>(state.receptionReducer.testreception)) //--------------redis
  
  useEffect(()=>{ //맨처음 기본설정 당일, testReception 바뀔때마다 랜더링
    getpatient(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
  },[testReception]);
  
  const getpatient = async(startdate, enddate) => { //함수로 만든이유는 나중에 클릭할때도 사용
    try { 
      setStartdate(startdate)
      setEnddate(enddate)
      const response = await testlistByDate(moment(startdate).format('YYYY-MM-DD'), moment(new Date(enddate).getTime() + 1 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD'));
      const patient = response.data;
      setPatient(response.data);
      const waiting = patient.filter(patient => patient.status === "대기중");
      setWaiting(waiting)
      const progress = patient.filter(patient => patient.status === "진행중");
      setProgress(progress)
      const complete = patient.filter(patient => patient.status === "검사완료");
      setComplete(complete)
    } catch (error) {
      console.error(error)
    }
  }

  const gettest = (testreceptionid) => { //testreceptionid로 test 리스트를 가져옴
    if(selectpatientinfo.testreceptionid != null){
      testlistByReceptionid(selectpatientinfo.testreceptionid).then((response)=>{
      setTestdatas(response.data); //가져온 리스트 상태 저장
      })
   }
  }

  const ClickPatient = async(e, item, index) => {
    setSelectpatientinfo(item) //클릭한 환자 검사 접수 저장
 
    setGroupShow(true) //클릭시 show
  }
  
  useEffect(()=>{ //환자접수 id가 바뀔때마다 가져와지는 데이터들이 다름
    gettest();
  }, [selectpatientinfo.testreceptionid])

  return (
    <div className="vh-100" style={{minWidth:"1000px"}}>
      <div className="row m-0">
      <div className="col-3 pt-3" style={{borderRight:"1px solid #dadada"}}>
          <div className="row pl-3 ml-0" style={{backgroundColor: "#ffffff", width:"85%"}}><div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#FF8C64"}}><i class="bi bi-calendar4-week" style={{ fontSize:"22px"}}></i></div><div className="ml-4 pt-2">검사 대기 목록</div></div>
          <div style={{height:"88vh"}}>
          <PeriodSearch startdate={startdate} enddate={enddate} change={getpatient}/>
          <Tab.Container id="left-tabs-example" defaultActiveKey="wait">
          <Nav fill variant="tabs" className="flex-column mb-2">
            <Row className="ml-0 mr-0">
              <Nav.Item>
                <Nav.Link eventKey="total">전체<diV>{patients.length}</diV></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="wait">대기<diV>{waitings.length}</diV></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="progress">진행중<diV>{progresss.length}</diV></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="complete">완료<diV>{completes.length}</diV></Nav.Link>
              </Nav.Item>
            </Row>
          </Nav>
          
          <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ backgroundColor:"#ffffff", boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", fontSize:"13px"}}>
            <div className="col-2 p-0 pt-1 pb-1 text-center">접수번호</div>
            <div className="col-2 p-0 text-center">생년월일</div>
            <div className="col-2 p-0 text-center">이름</div>
            <div className="col-4 p-0 text-center">검사날짜</div>
            <div className="col-2 p-0 text-center">상태</div>
          </div>

          <Tab.Content className="overflow-auto" style={{height:"550px"}}>
              <Tab.Pane eventKey= "total" className="pt-1">
              {patients.map((item, index)=>{return(
                <div key={item.testreceptionid} className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ e => {ClickPatient(e, item, index) }} style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                  <div className="col-2 p-0 pt-1 pb-1 text-center">{item.testreceptionid}</div>
                  <div className="col-2 p-0 text-center">{item.ssn1}</div>
                  <div className="col-2 p-0 text-center">{item.patientname}</div>
                  <div className="col-4 p-0 text-center">{moment(item.testdate).format('YYYY-MM-DD')}</div>
                  <div className="col-2 p-0 text-center"><Badge className="mr-1" variant={(item.status == "검사완료")?"danger":"success"}>{item.status}</Badge><Badge variant={(item.resultstatus == "입력완료")?"info":"warning"}>{item.resultstatus}</Badge></div>
                </div>
              )})}
              </Tab.Pane>
              <Tab.Pane eventKey= "wait" className="pt-1">
              {waitings.map((item, index)=>{return(
                  <div key={item.testreceptionid} className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ e => {ClickPatient(e, item) }} style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}} >
                  <div className="col-2 p-0 pt-1 pb-1 text-center">{item.testreceptionid}</div>
                  <div className="col-2 p-0 text-center">{item.ssn1}</div>
                  <div className="col-2 p-0 text-center">{item.patientname}</div>
                  <div className="col-4 p-0 text-center">{moment(item.testdate).format('YYYY-MM-DD')}</div>
                  <div className="col-2 p-0 text-center"><Badge className="mr-1" variant="success">{item.status}</Badge><Badge variant={(item.resultstatus == "입력완료")?"info":"warning"}>{item.resultstatus}</Badge></div>
                  </div>
              )})}
              </Tab.Pane>
              <Tab.Pane eventKey= "progress" className="pt-1">
              {progresss.map((item, index)=>{return(
                <div key={item.testreceptionid} className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ e => {ClickPatient(e, item) }} style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6", backgroundColor:"color"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">{item.testreceptionid}</div>
                <div className="col-2 p-0 text-center">{item.ssn1}</div>
                <div className="col-2 p-0 text-center">{item.patientname}</div>
                <div className="col-4 p-0 text-center">{moment(item.testdate).format('YYYY-MM-DD')}</div>
                <div className="col-2 p-0 text-center"><Badge className="mr-1" variant="primary">{item.status}</Badge><Badge variant={(item.resultstatus == "입력완료")?"info":"warning"}>{item.resultstatus}</Badge></div>
              </div>
              )})}
              </Tab.Pane>
              <Tab.Pane eventKey= "complete" className="pt-1">
              {completes.map((item, index)=>{return(
                <div key={item.testreceptionid} className="pt-2 pb-2 mb-2 d-flex align-items-center" onClick={ e => {ClickPatient(e, item) }} style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6", backgroundColor:"color"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">{item.testreceptionid}</div>
                <div className="col-2 p-0 text-center">{item.ssn1}</div>
                <div className="col-2 p-0 text-center">{item.patientname}</div>
                <div className="col-4 p-0 text-center">{moment(item.testdate).format('YYYY-MM-DD')}</div>
                <div className="col-2 p-0 text-center"><Badge className="mr-1" variant="danger">{item.status}</Badge><Badge variant={(item.resultstatus == "입력완료")?"info":"warning"}>{item.resultstatus}</Badge></div>
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
            <div className="col p-0 pt-1 pb-1 text-center border-right">{selectpatientinfo.patientid}</div>
            <div className="col p-0 pt-1 pb-1 text-center">생년월일 :</div>
            <div className="col p-0 pt-1 pb-1 text-center border-right">{selectpatientinfo.ssn1}</div>
            <div className="col p-0 pt-1 pb-1 text-center">성별 :</div>
            <div className="col p-0 pt-1 pb-1 text-center border-right">{selectpatientinfo.sex}</div>
            <div className="col p-0 pt-1 pb-1 text-center">이름 :</div>
            <div className="col p-0 pt-1 pb-1 text-center">{selectpatientinfo.patientname}</div>
          </div>
          <div className="d-flex pt-3">
            <div style={{width:"96%", marginLeft:"2%"}}>{groupshow?<TestGroup startdate={startdate} enddate={enddate} getpatient={getpatient} selectpatientinfo={selectpatientinfo} testdatas={testdatas} gettest={gettest} setTestdatas={setTestdatas}/>
            :<div style={{textAlign:"center", color:"#999999"}}><div><i class="bi bi-clipboard-plus" style={{fontSize:"180px"}}></i></div><div style={{fontSize:"35px"}}>환자를 선택해주세요</div></div>}</div>
          </div>
        </div>

        <div className="col-4 pt-3" style={{borderLeft:"1px solid #dadada"}}>
          <div className="row pl-3 10vh ml-0" style={{backgroundColor: "#ffffff", width:"85%"}}>
            <div className="pr-3 pl-3 pt-2 pb-2" style={{ backgroundColor:"#3EB2A2"}}>
              <i class="bi bi-display" style={{ fontSize:"22px"}}></i>
            </div>
            <div className="ml-4 pt-2">X-RAY 결과 입력</div>
          </div>

          <div className="row" style={{height:"2%"}}></div>
          <div style={{height:"65%"}}>
            <TestResult selectpatientinfo={selectpatientinfo} testdatas={testdatas} gettest={gettest} startdate={startdate} enddate={enddate} getpatient={getpatient}/>
          </div>
          <div style={{height:"10%"}}></div>
        </div>

      </div> 
    </div>
  );
}
export default TestPage;