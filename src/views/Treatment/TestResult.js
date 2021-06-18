import { Table } from "react-bootstrap";

function TestResult(props) {
  return (
    <>
      <div className="d-flex align-items-center" style={{height:"50px"}}>검사 결과</div>
      <div className="p-3" style={{height:"calc(100% - 50px)", boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px"}}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>검사코드</th>
              <th>검사명</th>
              <th>결과값</th>
              <th>하한값</th>
              <th>상한값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default TestResult;