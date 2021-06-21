import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import TestCode from "./TestCode";

const intitState = () =>{
  let states= []
  for(var i=0; i<6;i++) {
    state.push({label:"success", state:"대기중", code:"묶음코드", ischeck:false})
  }
  return state;
}
function TestGroup(props) {
  useEffect(()=>{
    console.log("hi1")
    console.log(props.state)
  },[props.state])
  const [state, setState] = useState(intitState);
  const changeHandler = (event, arrindex) => { 
    const modify = checkedInputs.map((item,index)=>{
      if(index===arrindex){
        item = event.target.checked;
      }
      return item;
    })
    setCheckedInputs(modify)
  }

  
   useEffect(() => {
      let tmp = [object,object,object,object,object,object];
      let item;
        for(var i=0; i<checkedInputs.length; i++){
            if(checkedInputs[i]){
              //console.log(i)
              if(object.state==="진행중"){
                item = {
                  label: 'primary',
                  state: '진행중'
                };
              }
              else if(object.state==="대기중"){
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
          tmp[i] = change[i];
        }
      }
      setChange(tmp)
      
     
  },[object.state])
  return (
    <div>
    <Accordion defaultActiveKey="0">
    {state.map((item,index)=>{return(
      <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
          <input type="checkbox" onChange={e => {changeHandler(e,index)}} value={state[index].ischeck}/>{state[index].code} <Badge variant={state[index].label}>{state[index].code}</Badge>
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