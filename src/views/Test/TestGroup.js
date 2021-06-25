import { useEffect, useState } from "react";
import { Badge, Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import TestCode from "./TestCode";
import xlsx from 'xlsx';
import React from 'react';
import Print from "./Print";


const intitState = (props) =>{
  let states= []
  for(var i=0; i<4; i++) {
    states.push({label:"", state:"", code:"묶음코드", ischeck:false})
  }
  return states;
}
function TestGroup(props) {
  const arr = 
  [{age:10, gender:'Male', name:'홍길동'},
  {age:20, gender:'Female', name:'심청'},
  {age:30, gender:'Male', name:'곰돌이'}];

  const handleExcel =() => {
    const ws = xlsx.utils.json_to_sheet(arr);

    const wb = xlsx.utils.book_new();
    
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    
    xlsx.writeFile(wb, "Test.xlsx");
  }

  const handlePrint = () => {
    setOpen(true);
  }

  const [state, setState] = useState(intitState);
  
  const changeHandler = (e, index) => { 
    const modify = state.map((item,i)=>{
      if(index===i){
        item.ischeck = e.target.checked
      }
      return item;
    })
    console.log(modify)
    setState(modify)
  }

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleExit = () => setOpen(false);

  const handleStart = (e) => {
    setShow(true);
    let checkItems = [];
    for(var i=0; i<state.length; i++){
      if(state[i].ischeck === true) {
        const item = {...state[i], state:"진행중", label:"primary", ischeck:false};
        checkItems.push(item);
      }else {
        const item = {...state[i]}
        checkItems.push(item);
      }
    }
    setState(checkItems);
  };

  const handleCancel = (e) => {
    alert("검사를 취소 하시겠습니까?")
    let checkItems = [];
    for(var i=0; i<state.length; i++){
    if(state[i].ischeck === true) {
      const item = {...state[i], state:"대기중", label:"success", ischeck:false};
      checkItems.push(item);
    }else {
      const item = {...state[i]}
      checkItems.push(item);
    }
  }
  setState(checkItems);
};
  const handleFinish = (e) => {
    alert("검사를 완료 하시겠습니까?")
    let checkItems = [];
    for(var i=0; i<state.length; i++){
    if(state[i].ischeck === true) {
      const item = {...state[i], state:"검사완료", label:"danger", ischeck:false};
        checkItems.push(item);
      }else {
        const item = {...state[i]}
        checkItems.push(item);
      }
    }
    setState(checkItems);
  };

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
          <div><input className="mr-2" type="checkbox" onChange={e => {changeHandler(e, index)}} checked={item.ischeck}/>{item.code} <Badge variant={item.label}>{item.state}</Badge></div>
        </Accordion.Toggle>
        <div className="mr-5">검사자: 홍길동</div>
      </Card.Header>
      <Accordion.Collapse eventKey={index.toString()}>
        <Card.Body><TestCode/></Card.Body>
      </Accordion.Collapse>
    </Card>
    )

    })}
   </Accordion>
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>검사를 시작하시겠습니까?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="검사자ID를 입력하세요"
        />
      </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

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