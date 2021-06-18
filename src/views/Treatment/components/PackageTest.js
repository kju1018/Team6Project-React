import { Accordion, Card } from "react-bootstrap";
import Test from "./Test";

function PackageTest(props) {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          묶음 코드 그룹명
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