import { useEffect, useState } from "react";
import { Col, Row, Toast } from "react-bootstrap";
import ButtonHeader from "./components/ButtonHeader";
import PackageImgTest from "./components/Tests/PackageImgTest";
import PackageTest from "./components/Tests/PackageTest";
import PrescriptionTestsModal from "./components/Tests/PrescriptionTestsModal";

function TestList(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupTests, setGroupTests] = useState({});



  const info = () => {
    alert("대기중인 진료를 선택해주세요.");
  }

  const toastClose = () => {
    props.closeShow();
  }

  const prescribeTests = (prescriptionItems) => {
    props.prescribeTests(prescriptionItems);
  }

  useEffect(() => {
    const group = props.treatmentTests.reduce((gt, t) => {
      if(!gt[t.groupcode]){
        gt[t.groupcode] = {};
        gt[t.groupcode].groupcode = t.groupcode;
        gt[t.groupcode].groupname = t.groupname;
        gt[t.groupcode].testtype = t.testtype;
        gt[t.groupcode].tests = [];
        gt[t.groupcode].tests.push(t);
      } else {
        gt[t.groupcode].tests.push(t);
      }
      return gt;
    }, {});
    setGroupTests(group);
  }, [props.treatmentTests])

  return (
    <>
      <ButtonHeader headertitle="검사 목록" iclassName="bi bi-droplet" color="#E89677" btnicon="bi bi-plus-square" onclick={props.treatment.status==="진료 대기"? handleShow : info}/>
      <PrescriptionTestsModal show={show} handleClose={handleClose} staticItemList={props.staticTests} itemList={props.treatmentTests} prescribe={prescribeTests}></PrescriptionTestsModal>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        {
          props.treatment.treatmentid == null ? 
          <div className="h-100 d-flex align-items-center justify-content-center">
            진료를 선택해주세요.
          </div>
          :
          (
            props.loading === true ? 
            <div className="d-flex h-100 justify-content-center align-items-center">
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            :
            (
              props.treatmentTests.length !== 0 ?
              Object.values(groupTests).map(groupTest => {
                return (
                  groupTest.testtype === "진단검사" ?
                  <PackageTest key={groupTest.groupcode}  groupTest={groupTest}/>
                  :
                  <PackageImgTest key={groupTest.groupcode} groupTest={groupTest}></PackageImgTest>
                );
              })
              :
              <div className="h-100 d-flex align-items-center justify-content-center">
                처방 받은 내역이 없습니다.
              </div>
            )
          )
        }
        <div style={{position: "absolute", bottom: "40px", right: "30px"}}>
          <Row>
            <Col style={{width:"400px"}}>
              <Toast onClose={toastClose} show={props.toastShow} delay={5000} autohide>
                <Toast.Header style={{backgroundColor:"#1B296D"}}>
                  <strong className="mr-auto" style={{color:"white"}}>Message</strong>
                  <small>complete</small>
                </Toast.Header>
                <Toast.Body>진료 완료!</Toast.Body>
              </Toast>
            </Col>
          </Row>
        </div>



      </div>
    </>
  );
  
}

export default TestList;