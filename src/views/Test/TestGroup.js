import { useState } from "react";
import { Badge, Button, Modal, Accordion, Card  } from "react-bootstrap";
import xlsx from 'xlsx';
import React from 'react';
import Print from "./Print";

const intitState = (props) =>{
  let states= []
  for(var i=0; i<4; i++) {
    states.push({label:"", state:"", code:"묶음코드", ischeck:false, tester:"", saveBtn:true})
  }
  return states;
}

function TestGroup(props) {
  const [state, setState] = useState(intitState); //묶음 코드 객체
  const [open, setOpen] = useState(false); //모달 열림/닫힘 상태

  const handleExcel =() => { //엑셀 버튼 클릭 시, 동작하는 함수
    const ws = xlsx.utils.json_to_sheet(state); //안에 배열의 객체 넣으면 그대로 출력
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "Test.xlsx");
  }

  const handlePrint = () => { //바코드 생성 버튼
    for(var i=0; i<state.length; i++){
      if(state[i].ischeck !== false){ //체크박스 미 선택 시, 바코드 생성 안됨 
        setOpen(true); //모달 생성, 모달 안에 바코드 컴포넌트 있음
        let checkItems = [];
        for(var i=0; i<state.length; i++){     
          const item = {...state[i], ischeck:false}
          checkItems.push(item);
        }
        setState(checkItems); //체크하고 버튼 누르면 자동으로 체크 해제
      } 
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
    for(var i=0; i<state.length; i++){
      if(state[i].ischeck !== false){
        let checkItems = [];
        for(var i=0; i<state.length; i++){
          if(state[i].ischeck === true) {
            const item = {...state[i], state:"진행중", label:"primary", ischeck:false, tester:"이연정", saveBtn:true}
            checkItems.push(item);
          }else {
            const item = {...state[i]}
            checkItems.push(item);
          }
        }
      setState(checkItems);  
      } 
    }
  };
  
  const handleCancel = (e) => { //검사 취소
    for(var i=0; i<state.length; i++){
      if(state[i].ischeck !== false){
        let checkItems = [];
        for(var i=0; i<state.length; i++){
          if(state[i].ischeck === true) {
            const item = {...state[i], state:"대기중", label:"success", ischeck:false, tester:"", saveBtn:true};
            checkItems.push(item);
          }else {
            const item = {...state[i]}
            checkItems.push(item);
          }
        }
      setState(checkItems);
      }
    }
  };

  const handleFinish = (e) => { //검사 완료
    for(var i=0; i<state.length; i++){
      if(state[i].ischeck !== false){
        let checkItems = [];
        for(var i=0; i<state.length; i++){
        if(state[i].ischeck === true) {
          const item = {...state[i], state:"검사완료", label:"danger", ischeck:false, tester:"이연정", saveBtn:false};
            checkItems.push(item);
          }else {
            const item = {...state[i]}
            checkItems.push(item);
          }
        }
        setState(checkItems);
      }
    }
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


    <div className="overflow-auto" style={{height:"750px"}}>
      <Accordion defaultActiveKey="0">
        {state.map((item,index)=>{return(
          <Card>
          <Card.Header className="row" style={{backgroundColor:"#D5D5D5", height:"60px", alignItems:"center"}}>
            <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
              {/* checked: 체크박스 체크 유무 */}
              <div><input className="mr-2" type="checkbox" onChange={e => {changeHandler(e, index)}} checked={item.ischeck}/>{item.code}<Badge variant={item.label}>{item.state}</Badge></div>
            </Accordion.Toggle>
            <div className="mr-5">검사자: {item.tester}</div>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
              <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">#</div>
                <div className="col-2 p-0 text-center">처방코드</div>
                <div className="col-2 p-0 text-center">검사명</div>
                <div className="col-2 p-0 text-center">용기</div>
                <div className="col-2 p-0 text-center">진료의</div>
                <div className="col-2 p-0 text-center">결과값</div>
              </div>

              <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">1</div>
                <div className="col-2 p-0 text-center">E7401</div>
                <div className="col-2 p-0 text-center">순환기능검사</div>
                <div className="col-2 p-0 text-center">EDTA</div>
                <div className="col-2 p-0 text-center">신용권</div>
                <div className="col-2 p-0 text-center"> <input type="text" style={{width:"100%"}} ></input></div>
               
              </div>

              <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">2</div>
                <div className="col-2 p-0 text-center">B1020</div>
                <div className="col-2 p-0 text-center">헤마토 크리트</div>
                <div className="col-2 p-0 text-center">EDTA</div>
                <div className="col-2 p-0 text-center">신용권</div>
                <div className="col-2 p-0 text-center"> <input type="text" style={{width:"100%"}} ></input></div>
              </div>
              
              <div className="mt-3 text-right"><button className="btn btn-info btn-sm mr-2" disabled={item.saveBtn} onClick={Save}>저장</button></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        )
        })} 
      </Accordion>
    </div>

    <Modal show={open} onHide={handleExit}>
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