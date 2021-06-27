import { Accordion, Alert, Card } from "react-bootstrap";
import Test from "./Test";

function PackageTest(props) {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Alert} variant="secondary" className="mb-0" eventKey="0">
        {props.groupTest.groupcode}&nbsp;&nbsp;{props.groupTest.groupname}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {props.groupTest.tests.map(test => {
              return (
                <Test test={test}/>
              );
            })}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default PackageTest;