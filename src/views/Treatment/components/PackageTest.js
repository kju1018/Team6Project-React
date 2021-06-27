import { Accordion, Card } from "react-bootstrap";
import Test from "./Test";

function PackageTest(props) {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
        L2001 CBC (CBC,PLT,DIFF)
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Test/>
            <Test/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default PackageTest;