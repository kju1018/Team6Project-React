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
  useEffect(()=>{
    // console.log("hi1")
    // console.log(props.state)
  },[props.state])
  const [state, setState] = useState(intitState);
  
  const changeHandler = (e, stateindex) => { 
    
  }

   useEffect(() => {
      let tmp = intitState;
      let item;
        for(var i=0; i<state.length; i++){
            if(state[i]){
              //console.log(i)
              if(state.state==="진행중"){
                item = {
                  label: 'primary',
                  state: '진행중'
                };
              }
              else if(state.state==="대기중"){
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
      setState(tmp)
      
     
  },[state.state])
  return (
    <div className="overflow-auto" style={{height:"750px", backgroundColor:"#ffffff"}}>
    <Accordion defaultActiveKey="0">
    {state.map((item,index)=>{return(
      <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
          <input type="checkbox" onChange={e => {changeHandler(e, index)}} value={state[index].ischeck}/>{state[index].code} <Badge variant={state[index].label}>{state[index].code}</Badge>
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
  );
}
export default TestGroup;