import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import TestCode from "./TestCode";
function TestGroup(props) {
  //console.log(props.state);
  const [color, setColor] = useState('success');
  useEffect(() => {
    if (props.state === "대기중") {
      let label = 'success'
      setColor(label);
    }
    if (props.state === "진행중") {
      let label = 'primary'
      setColor(label);
    }
    if (props.state === "완료") {
      let label = 'danger'
      setColor(label);
    }
  })
  return (
    <div>
    <Accordion defaultActiveKey="0">
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          묶음코드 <Badge variant={color}>{props.state}</Badge>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body><TestCode/></Card.Body>
      </Accordion.Collapse>
    </Card>
    </Accordion>
    </div>
  );
}
export default TestGroup;