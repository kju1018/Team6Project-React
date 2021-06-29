import { useEffect, useState } from "react";
import { Badge, Button, Modal, Accordion, Card  } from "react-bootstrap";
import xlsx from 'xlsx';
import React from 'react';
import Print from "./Print";
import { testList, testData } from "./data/patient"

function TestGroup(props) {
  const [state, setState] = useState(testList()); //묶음 코드 객체
  const [open, setOpen] = useState(false); //모달 열림/닫힘 상태
  const [testdata, setTestData] = useState(testList());
  const [testlist, setTestList] = useState(testData())
  const [groupList, setGroupList] = useState({});
  const [grouptitle, setGroupTitle] = useState([]);
  
  let excel = [];
  var pass = props.clickdate
  var id = props.passdata
  const patienttest = testList();

  useEffect(()=>{ 
    const group = [];
    const temp = [];
    for(var i=0; i<state.length; i++){
      if(id.testreceptionid === patienttest[i].testreceptionid){ 
        for(var j=0; j<testdata.length; j++){
          if(state[i].testdataid === testlist[j].testdataid){
            const put = {...testlist[j], state:patienttest[i].state}
            temp.push(put)        
          }
        } 
      }    
    }
    for(var i=0; i<temp.length; i++){
      group.push(temp[i].groupcode)
    }
    const set = new Set(group)
    setGroupTitle([...set]); //묶음 코드 중복 제거
    
    const title = [...set];

    let obj = {};
    for(var i=0; i<title.length; i++){
        for(var j=0; j<temp.length; j++){
          if(title[i] === temp[j].groupcode) {
            if(obj[title[i]]){
              obj[title[i]].push(temp[j]);
            } else {
              obj[title[i]]=[];
              obj[title[i]].push(temp[j]);
            }
          }
       }
    }
    setGroupList(obj);

    console.log(temp)

  }, [id.testreceptionid])


  const handleExcel =() => { //엑셀 버튼 클릭 시, 동작하는 함수
    const ws = xlsx.utils.json_to_sheet(testdata); //안에 배열의 객체 넣으면 그대로 출력
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "Test.xlsx");
  }

  const handlePrint = () => { //바코드 생성 버튼
    let checkItems = [];
    let flag = 0;
    for(var i=0; i<state.length; i++){
      if(state[i].ischeck === true){ //체크박스 선택 시, 
        if(state[i].state === "진행중") {
          alert("이미 검사가 진행중입니다.")
          const item = {...state[i], ischeck:false}
          checkItems.push(item);
          flag = 1;
        } else if(state[i].state === "검사완료"){
          alert("이미 검사가 완료되었습니다.");
          const item = {...state[i], ischeck:false}
          checkItems.push(item);
          flag = 1;
        } else {//대기중
          const item = {...state[i], state:"진행중", tester:"이연정", label:"primary", ischeck:false, saveBtn:true}
          checkItems.push(item);
        }
      } else {
        checkItems.push(state[i]);
      }
    }
    setState(checkItems); //체크하고 버튼 누르면 자동으로 체크 해제
    if(flag === 0) {
      setOpen(true); 
    }
  }

  const handleExit = () => setOpen(false); //바코드 모달 닫힘


  const changeHandler = (e, index) => { //체크버튼 선택 시, ischeck 변경해줌 
    const modify = state.map((item,i)=>{
      if(index===i){
        item.ischeck = e.target.checked
      }
      return item;
    })
    console.log(modify)
    setState(modify)
  }

  const handleStart = (e) => { //검사 시작
    let checkItem = [];
    
    for(var i=0; i<state.length; i++) {
      if(state[i].ischeck === true){
        if(state[i].state === "진행중"){
          alert("이미 검사가 진행중입니다.")
          const item = {...state[i], ischeck:false}
          checkItem.push(item)
        } else if (state[i].state === "검사완료") {
          alert("이미 검사가 완료되었습니다.")
          const item = {...state[i], ischeck:false}
          checkItem.push(item)
        } else {
          const item = {...state[i], state:"진행중", tester:"이연정", label:"primary", ischeck:false, saveBtn:true}
          checkItem.push(item)
        }
      } else {
        checkItem.push(state[i]);
      }
    }
    setState(checkItem)
  };
  
  const handleCancel = (e) => { //검사 취소
    let checkItem = [];
    
    for(var i=0; i<state.length; i++) {
      if(state[i].ischeck === true){
        if(state[i].state === "대기중"){
          alert("검사가 대기중입니다.")
          const item = {...state[i], ischeck:false}
          checkItem.push(item)
        } else if (state[i].state === "검사완료") {
          alert("이미 검사가 완료되었습니다.")
          const item = {...state[i], ischeck:false}
          checkItem.push(item)
        } else {
          const item = {...state[i], state:"대기중", tester:"이연정", label:"success", ischeck:false, saveBtn:true}
          checkItem.push(item)
        }
      } else {
        checkItem.push(state[i]);
      }
    }
    setState(checkItem)
  };

  const handleFinish = (e) => { //검사 완료
    let checkItem = [];
    
    for(var i=0; i<state.length; i++) {
      if(state[i].ischeck === true){
        if(state[i].state === "대기중"){
          alert("먼저 검사를 진행해주세요.")
          const item = {...state[i], ischeck:false}
          checkItem.push(item)
        } else if (state[i].state === "검사완료") {
          alert("이미 검사가 완료되었습니다.")
          const item = {...state[i], ischeck:false}
          checkItem.push(item)
        } else {
          const item = {...state[i], state:"검사완료", tester:"이연정", label:"danger", ischeck:false, saveBtn:true}
          checkItem.push(item)
        }
      } else {
        checkItem.push(state[i]);
      }
    }
    setState(checkItem)
  };

  const Save = () => {
    alert("저장")
  }
  return (
    <>
    <div className="mt-4 mb-2 text-right">
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleStart } value="검사시작">검사시작</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handlePrint } value="바코드출력">바코드출력</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleCancel } value="접수취소">접수취소</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleExcel }>엑셀저장</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleFinish } value="검사완료">검사완료</button>
    </div>


    <div className="overflow-auto" style={{height:"700px"}}>
      <Accordion defaultActiveKey="0">
      {grouptitle.map((item,index)=>{
        return(
          <Card>
          <Card.Header className="row" style={{backgroundColor:"#D5D5D5", height:"60px", alignItems:"center"}}>
            <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
              {/* checked: 체크박스 체크 유무 */}
              <div><input className="mr-2" type="checkbox" onChange={e => {changeHandler(e, index)}} checked={item.ischeck}/>{item}<Badge className="ml-3" variant={item.label}>{item.state}</Badge></div>
            </Accordion.Toggle>
            <div>검사자: {item.tester}</div>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
              <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">#</div>
                <div className="col-2 p-0 text-center">처방코드</div>
                <div className="col-2 p-0 text-center">검사명</div>
                <div className="col-2 p-0 text-center">용기</div>
                <div className="col-2 p-0 text-center">상태</div>
                <div className="col-2 p-0 text-center">결과값</div>
              </div>
              {groupList[item].map((test, index) => {
                return (
                  <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                    <div className="col-2 p-0 pt-1 pb-1 text-center">{index}</div>
                    <div className="col-2 p-0 text-center">{test.testdataid}</div>
                    <div className="col-2 p-0 text-center">{test.testdataname}</div>
                    <div className="col-2 p-0 text-center">EDTA</div>
                    <div className="col-2 p-0 text-center">{test.state}</div>
                    <div className="col-2 p-0 text-center"> <input type="text" style={{width:"100%"}} ></input></div>
                  </div>
                )
              })}
              
              <div className="mt-3 text-right"><button className="btn btn-info btn-sm mr-2" disabled={item.saveBtn} onClick={Save}>저장</button></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        )
        })} 
      </Accordion>
    </div>

    <Modal show={open} onHide={handleExit} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>바코드 생성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Print/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleExit}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  </>
  );
}
export default TestGroup;