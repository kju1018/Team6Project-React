import { Nav, Row, Tab, Badge } from "react-bootstrap";
import moment from 'moment';
import { useEffect } from "react";

function PatientList(props) {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="wait">
          <Nav fill variant="tabs" className="flex-column mb-2">
            <Row className="ml-0 mr-0">
              <Nav.Item>
                <Nav.Link eventKey="total">전체<diV>{props.patients.length}</diV></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="wait">대기<diV>{props.waitings.length}</diV></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="progress">진행중<diV>{props.progresss.length}</diV></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="complete">완료<diV>{props.completes.length}</diV></Nav.Link>
              </Nav.Item>
            </Row>
          </Nav>
          
          <div className="pt-2 pb-2 d-flex align-items-center" style={{ backgroundColor:"#eaeaea", color:"black", borderBottom:"1px solid gray", borderTop:"1px solid gray", fontSize:"14.5px"}}>
            <div className="col-2 p-0 text-center">접수번호</div>
            <div className="col-3 p-0 text-center">생년월일</div>
            <div className="col-2 p-0 text-center">이름</div>
            <div className="col-3 p-0 text-center">검사날짜</div>
            <div className="col-2 p-0 text-center">상태</div>
          </div>

          <Tab.Content className="overflow-auto" id="style-7" style={{height:"550px"}}>
            {props.patients.length === 0? 
            <Tab.Pane eventKey= "total" className="pt-1">
              <div style={{textAlign:"center", color:"#999999"}}><div><i className="bi bi-person-x" style={{fontSize:"180px"}}></i></div><div style={{fontSize:"30px"}}>해당되는 환자가 없습니다.</div></div>
            </Tab.Pane>
            :
              <Tab.Pane eventKey= "total" className="pt-1">
              {props.patients.map((item, index)=>{return(
                <div key={item.testreceptionid} id={item.testreceptionid} className="pt-2 pb-2 d-flex align-items-center radio" onClick={ e => {props.ClickPatient(e, item, index) }} style={{ fontSize:"15px", borderBottom:"1px solid #a6a6a6", backgroundColor: props.select === item.testreceptionid ? "#faf4c0" : ""}}>
                  <div className="col-2 p-0 text-center">{item.testreceptionid}</div>
                  <div className="col-3 p-0 text-center">{item.ssn1}</div>
                  <div className="col-2 p-0 text-center" style={{fontWeight:"bold"}}>{item.patientname}</div>
                  <div className="col-3 p-0 text-center">{moment(item.testdate).format('YYYY-MM-DD')}</div>
                  <div className="col-2 p-0 text-center" style={{fontSize:"17px"}}><Badge variant={(item.resultstatus == "입력완료")?"info":"warning"}>{item.resultstatus}</Badge></div>
                </div>
              )})}
              </Tab.Pane>}

              {props.waitings.length === 0? 
            <Tab.Pane eventKey= "wait" className="pt-1">
              <div style={{textAlign:"center", color:"#999999"}}><div><i className="bi bi-person-x" style={{fontSize:"180px"}}></i></div><div style={{fontSize:"30px"}}>대기중인 환자가 없습니다.</div></div>
            </Tab.Pane>
            :
              <Tab.Pane eventKey= "wait" className="pt-1">
              {props.waitings.map((item, index)=>{return(
                  <div key={item.testreceptionid} id={item.testreceptionid} className="pt-1 pb-1 d-flex align-items-center" onClick={ e => {props.ClickPatient(e, item) }} style={{ fontSize:"15px", borderBottom:"1px solid #a6a6a6", backgroundColor: props.select === item.testreceptionid ? "#faf4c0" : ""}} >
                  <div className="col-2 p-0 text-center">{item.testreceptionid}</div>
                  <div className="col-3 p-0 text-center">{item.ssn1}</div>
                  <div className="col-2 p-0 text-center" style={{fontWeight:"bold"}}>{item.patientname}</div>
                  <div className="col-3 p-0 text-center">{moment(item.testdate).format('YYYY-MM-DD')}</div>
                  <div className="col-2 p-0 text-center" style={{fontSize:"15px"}}><Badge className="mr-1" variant="success">{item.status}</Badge><Badge variant={(item.resultstatus == "입력완료")?"info":"warning"}>{item.resultstatus}</Badge></div>
                  </div>
              )})}
              </Tab.Pane>}

              {props.progresss.length === 0? 
            <Tab.Pane eventKey= "progress" className="pt-1">
              <div style={{textAlign:"center", color:"#999999"}}><div><i className="bi bi-person-x" style={{fontSize:"180px"}}></i></div><div style={{fontSize:"30px"}}>진행중인 환자가 없습니다</div></div>
            </Tab.Pane>
            :
              <Tab.Pane eventKey= "progress" className="pt-1">
              {props.progresss.map((item, index)=>{return(
                <div key={item.testreceptionid} id={item.testreceptionid} className="pt-1 pb-1 d-flex align-items-center" onClick={ e => {props.ClickPatient(e, item) }} style={{ fontSize:"15px", borderBottom:"1px solid #a6a6a6", backgroundColor: props.select === item.testreceptionid ? "#faf4c0" : ""}}>
                <div className="col-2 p-0 text-center">{item.testreceptionid}</div>
                <div className="col-3 p-0 text-center">{item.ssn1}</div>
                <div className="col-2 p-0 text-center" style={{fontWeight:"bold"}}>{item.patientname}</div>
                <div className="col-3 p-0 text-center">{moment(item.testdate).format('YYYY-MM-DD')}</div>
                <div className="col-2 p-0 text-center" style={{fontSize:"15px"}}><Badge className="mr-1" variant="primary">{item.status}</Badge><Badge variant={(item.resultstatus == "입력완료")?"info":"warning"}>{item.resultstatus}</Badge></div>
              </div>
              )})}
              </Tab.Pane>}

              {props.completes.length === 0? 
            <Tab.Pane eventKey= "complete" className="pt-1">
              <div style={{textAlign:"center", color:"#999999"}}><div><i className="bi bi-person-x" style={{fontSize:"180px"}}></i></div><div style={{fontSize:"30px"}}>완료된 환자가 없습니다.</div></div>
            </Tab.Pane>
            :
              <Tab.Pane eventKey= "complete" className="pt-1">
              {props.completes.map((item, index)=>{return(
                <div key={item.testreceptionid} id={item.testreceptionid} className="pt-1 pb-1 d-flex align-items-center" onClick={ e => {props.ClickPatient(e, item) }} style={{ fontSize:"15px", borderBottom:"1px solid #a6a6a6", backgroundColor: props.select === item.testreceptionid ? "#faf4c0" : ""}}>
                <div className="col-2 p-0 text-center">{item.testreceptionid}</div>
                <div className="col-3 p-0 text-center">{item.ssn1}</div>
                <div className="col-2 p-0 text-center" style={{fontWeight:"bold"}}>{item.patientname}</div>
                <div className="col-3 p-0 text-center">{moment(item.testdate).format('YYYY-MM-DD')}</div>
                <div className="col-2 p-0 text-center" style={{fontSize:"15px"}}><Badge className="mr-1" variant="danger">{item.status}</Badge><Badge variant={(item.resultstatus == "입력완료")?"info":"warning"}>{item.resultstatus}</Badge></div>
              </div>
              )})}
              </Tab.Pane>}
            </Tab.Content>
          </Tab.Container>
  );
}
export default PatientList;