
import { Accordion, Badge, Button, Card } from "react-bootstrap";

function Test(props) {
  return (
    <Accordion>
    <Card>
      <Card.Header>
        <Accordion.Toggle block as={Button} size="sm" variant="outline-dark" eventKey="0">
          <span style={{fontSize:"14px"}}>{props.test.testdataid}	&nbsp;&nbsp;{props.test.testname}
            &nbsp;&nbsp;<span style={{color:props.test.testcontainer==="EDTA"? "purple" : "red", marginRight:"8px"}}>{props.test.testcontainer}</span>
           {props.test.result !== null ? <Badge variant="primary">입력완료</Badge> : <Badge variant="danger">미입력</Badge>} 
          </span>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          {props.test.result !==null ? props.test.result : ""}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    </Accordion>
  );
}

export default Test;