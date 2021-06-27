
import { Accordion, Button, Card } from "react-bootstrap";

function Test(props) {
  return (
    <Accordion>
    <Card>
      <Card.Header>
        <Accordion.Toggle block as={Button} size="sm" variant="outline-dark" eventKey="0">
          <span style={{fontSize:"14px"}}></span>L2010	WBC
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          검사 결과
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    </Accordion>
  );
}

export default Test;