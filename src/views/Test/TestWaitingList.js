import { Badge } from "react-bootstrap";
import { useRef, useState } from "react";
import { Button, Overlay } from "react-bootstrap";

function TestWaitingList(props) {
  console.log(props)
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [state, setState] = useState();
  return (
    <>
      <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
        <div className="col-2 p-0 pt-1 pb-1 text-center">1</div>
              <div className="col-3 p-0 text-center">13232</div>
              <div className="col-2 p-0 text-center">F/29</div>
              <div className="col-2 p-0 text-center">이연정</div>
              <div className="col-3 p-0 text-center"><Badge className="mr-1" variant="primary">진행중</Badge><Badge variant="danger">미입력</Badge></div>
        </div>
    </>
  );
}
export default TestWaitingList;