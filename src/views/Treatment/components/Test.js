
import { Accordion, Badge, Button, Card, ListGroup, Table } from "react-bootstrap";

function Test(props) {
  return (
    <Accordion className="mb-3">
    <Card border="secondary">
      <Card.Header>
        <Accordion.Toggle block as={Button} size="sm" variant="outline-light" eventKey="0">
          <span style={{fontSize:"14px", fontWeight:"bold", color:"black"}}>{props.test.testdataid}	&nbsp;&nbsp;{props.test.testname}
            &nbsp;&nbsp;<span style={{color:props.test.testcontainer==="EDTA"? "purple" : "red", marginRight:"8px"}}>{props.test.testcontainer}</span>
           {(props.test.result !== null && props.test.result !=="") ? <Badge variant="primary">입력완료</Badge> : <Badge variant="danger">미입력</Badge>} 
          </span>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          {(props.test.result !== null && props.test.result !=="") ? 
            <Table striped hover className="text-center table-bordered">
              <thead></thead>
              <tbody>
                <tr>
                  <th>하한치</th>
                  <th>검사결과</th>
                  <th>상한치</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td className={(props.test.result < 0 || props.test.result > 5) ? "table-danger" : "table-primary"}>{props.test.result}</td>
                  <td>5</td>
                </tr>
              </tbody>
            </Table>
            : 
            "결과 미입력"}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    </Accordion>
  );
}

export default Test;