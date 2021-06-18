import { Button } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
function TestGroup() {
  return (
    <div>
    <Accordion defaultActiveKey="0">
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          Click me!
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>Hello! I'm the body</Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          Click me!
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Card.Body>Hello! I'm another body</Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          Click me!
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2">
        <Card.Body>Hello! I'm another body</Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
    </div>
  );
}
export default TestGroup;