import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import TestCode from "./TestCode";

const intitState = () =>{
  let states= []
  for(var i=0; i<10; i++) {
    states.push({label:"success", state:"대기중", code:"묶음코드", ischeck:false})
  }
  return states;
}
function TestGroup(props) {
  
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

  const handleStart = (e) => {
    console.log("클릭")
    for(var i=0; i<state.length; i++){
    if(state[i].ischeck === true) {
      
      }
    }
  };
  const handlePrint = (e) => {
    // const value = e.target.value;
    // if (value === "바코드출력") {
    //   console.log("vv", value)
    //   let change = 
    //     {label:"primary", state: "진행중", code:"묶음코드", ischeck:false}
    //   ;
    //   setState(change);
    //   console.log("ss", state)
    // }
  };
  const handleCancel = (e) => {
    // const value = e.target.value;
    // if (value === "접수취소") {
    //   console.log("vv", value)
    //   let change = 
    //     {label:"success", state: "대기중", code:"묶음코드", ischeck:false}
    //   ;
    //   setState(change);
    //   console.log("ss", state)
    // }
  };
  const handleFinish = (e) => {
    // const value = e.target.value;
    // if (value === "검사완료") {
    //   console.log("vv", value)
    //   let change = 
    //     {label:"danger", state: "완료", code:"묶음코드", ischeck:false}
    //   ;
    //   setState(change);
    //   console.log("ss", state)
    // }
  };

  useEffect(() => {
    let tmp = intitState();
    let item;
      for(var i=0; i<state.length; i++){
          if(state[i].ischeck === true){
            //console.log(i)
            if(state==="진행중"){
              item = {
                label: 'primary',
                state: '진행중'
              };
            }
            else if(state==="대기중"){
              item =  {
                label: 'success',
                state: '대기중'
              };
            }
            else{
              item = {
                label: 'danger',
                state: '완료'
              };
            }
          tmp[i] = item;         
      } else {
        tmp[i] = state[i];
      }
    }
    //setState(tmp)
},[state])



  return (
    <>
    <div className="mt-4 mb-2 text-right">
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleStart } value="검사시작">검사시작</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handlePrint } value="바코드출력">바코드출력</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleCancel } value="접수취소">접수취소</button>
      <button type="button" className="btn btn-dark btn-sm mr-1">엑셀저장</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleFinish } value="검사완료">검사완료</button>
    </div>
    <div className="overflow-auto" style={{height:"750px", backgroundColor:"#ffffff"}}>
    <Accordion defaultActiveKey="0">
    {state.map((item,index)=>{return(
      <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
          <input type="checkbox" onChange={e => {changeHandler(e, index)}} value={item.ischeck}/>{item.code} <Badge variant={item.label}>{item.state}</Badge>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={index.toString()}>
        <Card.Body><TestCode/></Card.Body>
      </Accordion.Collapse>
    </Card>
    )

    })}
   </Accordion>
    </div>
  </>
  );
}
export default TestGroup;