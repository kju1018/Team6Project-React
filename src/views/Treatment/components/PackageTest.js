import { Accordion, Alert, Card } from "react-bootstrap";
import Test from "./Test";

function PackageTest(props) {
  return (
    <Accordion className="mb-3">
      <Card >
        <Accordion.Toggle as={Alert} variant="dark" className="mb-0" eventKey="0">
        <span style={{fontWeight:"bold"}}>
        {props.groupTest.groupcode}&nbsp;&nbsp;{props.groupTest.groupname}</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {props.groupTest.tests.map(test => {
              return (
                <Test key={test.testdataid} test={test}/>
              );
            })}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default PackageTest;