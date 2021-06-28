import { useEffect, useState } from "react";
import ButtonHeader from "./components/ButtonHeader";
import PackageTest from "./components/PackageTest";
import PrescriptionTestsModal from "./components/PrescriptionTestsModal";

function TestList(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupTests, setGroupTests] = useState([]);

  const info = () => {
    alert("대기중인 진료를 선택해주세요.");
  }

  const prescribeTests = (prescriptionItems) => {
    props.prescribeTests(prescriptionItems);
  }
  console.log("TestList");
  useEffect(() => {
    const group = props.treatmentTests.reduce((gt, t) => {
      if(!gt[t.groupcode]){
        gt[t.groupcode] = {};
        gt[t.groupcode].groupcode = t.groupcode;
        gt[t.groupcode].groupname = t.groupname;
        gt[t.groupcode].tests = [];
        gt[t.groupcode].tests.push(t);
      } else {
        gt[t.groupcode].tests.push(t);
      }
      return gt;
    }, {});
    console.log(group)
    setGroupTests(group);
  }, [props.treatmentTests])

  return (
    <>
      <ButtonHeader headertitle="검사 목록" iclassName="bi bi-droplet" color="#E89677" btnicon="bi bi-plus-square" onclick={props.treatment.state==="진료 대기"? handleShow : info}/>
      <PrescriptionTestsModal show={show} handleClose={handleClose} staticItemList={props.staticTests} itemList={props.treatmentTests} prescribe={prescribeTests}></PrescriptionTestsModal>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px)"}}>
        {Object.values(groupTests).map(groupTest => {
          console.log(groupTest);
          return (
            <PackageTest key={groupTest.groupcode}  groupTest={groupTest}/>
            );
        })
        }
      </div>
    </>
  );
}

export default TestList;