import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import TestCode from "./TestCode";
function TestGroup(props) {
  let object = {
    label: props.state.label,
    state: props.state.state
  }
  useEffect(()=>{
    console.log("hi1")
    console.log(props.state)
  },[props.state])
  const [checkedInputs, setCheckedInputs] = useState([false,false,false,false,false,false]);
  const [arr, setArr] = useState(["묶음코드","묶음코드","묶음코드","묶음코드","묶음코드","묶음코드"])
  const changeHandler = (event, arrindex) => { 
    const modify = checkedInputs.map((item,index)=>{
      if(index===arrindex){
        item = event.target.checked;
      }
      return item;
    })
    setCheckedInputs(modify)
  }

  
  const [change, setChange] = useState([object,object,object,object,object,object]);
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
    {arr.map((item,index)=>{return(
      <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
          <input type="checkbox" onChange={e => {changeHandler(e,index)}} value={checkedInputs[index]}/>{item} <Badge variant={change[index].label}>{change[index].state}</Badge>
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