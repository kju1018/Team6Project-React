import { useEffect, useState } from "react";
import { Badge, Button, Modal, Accordion, Card  } from "react-bootstrap";
import xlsx from 'xlsx';
import React from 'react';
import Print from "./Print";
import { testlistByReceptionid } from "apis/test";

function TestGroup(props) {
  const [open, setOpen] = useState(false); //모달 열림/닫힘 상태
  const [testdata, setTestData] = useState([])
  const [groupList, setGroupList] = useState({}); //제일 바깥

  

  useEffect(()=>{ 
    console.log(props.clickdate.testreceptionid) 
    testlistByReceptionid(props.clickdate.testreceptionid).then((response)=>{
      const testdatas = response.data;
      const group = [];
          for(var i=0; i<testdatas.length; i++){
            group.push(testdatas[i].groupcode)    
          }

          const set = new Set(group)
          const title = [...set]; //묶음 코드 중복 제거

          let obj = {};//나중에 groupList가 데이터 가공후 리스트에 추가
          for(var i=0; i<title.length; i++){
              for(var j=0; j<testdatas.length; j++){
                if(title[i] === testdatas[j].groupcode) {
                  if(obj[title[i]]){ //그룹코드이름으로 된 속성이 있을 때
                    obj[title[i]].tests.push(testdatas[j]);
                  } else {
                    obj[title[i]]={}; //묶음코드 하나하나 객체
                    obj[title[i]].groupcode=testdatas[j].groupcode;
                    obj[title[i]].groupname=testdatas[j].groupname;
                    obj[title[i]].status=testdatas[j].status;
                    obj[title[i]].ischeck=false;
                    if(testdatas[j].status === "검사완료") {
                      obj[title[i]].saveBtn=false;
                      obj[title[i]].label = "danger";
                    } else if (testdatas[j].status === "진행중") {
                      obj[title[i]].saveBtn=true;
                      obj[title[i]].label = "primary";
                    } else {
                      obj[title[i]].saveBtn=true;
                      obj[title[i]].label = "success";
                    };
                    obj[title[i]].tests=[];
                    obj[title[i]].tests.push(testdatas[j]);
                  }
                }
            }
          }
          setGroupList(obj);



    })
    

    
  }, [props.clickdate.testreceptionid])
  console.log(testdata)
  
  const gettest = async(testreceptionid) => {
    try {
      const response = await testlistByReceptionid(testreceptionid);
      setTestData(response.data);
    } catch (error) {
      console.log(error)
    } 
  }
 

  const handleExit = () => setOpen(false); //바코드 모달 닫힘


  const changeHandler = (e, groupcode) => { //체크버튼 선택 시, ischeck 변경해줌 
    const modify = Object.values(groupList).map((group)=>{
      if(group.groupcode===groupcode){
        group.ischeck = e.target.checked
      }
      return group;
    })
    console.log(modify);
    setGroupList(modify)
  }

  const handleStart = (groupList) => {
    let checkedList = [];
    let flag = 0;
    
    const newGroupList = Object.values(groupList).map ((group) => {
      if(group.ischeck === true){
        group.ischeck = false;
        if(group.status === "대기중"){
          checkedList.push(group);
        } else {
          flag = 1;
        }
      }
      return group;
    });
    if(flag === 0){
      //startTests(checkedList);
    }
    
    setGroupList(newGroupList);
  }

  const handleExcel =() => { //엑셀 버튼 클릭 시, 동작하는 함수
    const ws = xlsx.utils.json_to_sheet(testdata); //안에 배열의 객체 넣으면 그대로 출력
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "처방검사.xlsx");
  }

  const handlePrint = () => { 
    const newGroupList = Object.values(groupList).map ((group) => {
      if(group.ischeck === true){
        setOpen(true);
        group.ischeck = false;
      }
      return group;
    });
    setGroupList(newGroupList);
  }

  const handleCancel =() => { 
    let checkedList = [];
    let flag = 0;
    
    const newGroupList = Object.values(groupList).map ((group) => {
      if(group.ischeck === true){
        group.ischeck = false;
        if(group.state === "진행중"){
          checkedList.push(group);
        } else {
          flag = 1;
        }
      }
      return group;
    });
    if(flag === 0){
      //startTests(checkedList);
    }
    
    setGroupList(newGroupList);
  }

  const handleFinish =() => { 
    let checkedList = [];
    let flag = 0;
    
    const newGroupList = Object.values(groupList).map ((group) => {
      if(group.ischeck === true){
        group.ischeck = false;
        if(group.state === "진행중"){
          checkedList.push(group);
        } else {
          flag = 1;
        }
      }
      return group;
    });
    if(flag === 0){
      //startTests(checkedList);
    }
    
    setGroupList(newGroupList);
  }

  const Save = () => {
    alert("저장")
  }
  return (
    <>
    <div className="mt-4 mb-2 text-right">
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ () => { handleStart(groupList) }} value="검사시작">검사시작</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ () => {handlePrint(groupList) }} value="바코드출력">바코드출력</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ () => {handleCancel(groupList) }} value="접수취소">접수취소</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleExcel}>엑셀저장</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ () => {handleFinish(groupList) }} value="검사완료">검사완료</button>
    </div> 


    <div className="overflow-auto" style={{height:"700px"}}>
      <Accordion defaultActiveKey="0">
       {groupList !=={} &&
       Object.values(groupList).map((group, index)=> {
         return (
          <Card>
          <Card.Header className="row" style={{backgroundColor:"#D5D5D5", height:"60px", alignItems:"center"}}>
            <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
              {/* checked: 체크박스 체크 유무 */}
              <div><input className="mr-2" type="checkbox"  onChange={e => {changeHandler(e, group.groupcode)}} checked={group.ischeck}/>{group.groupcode}<Badge className="ml-3" variant={group.label}>{group.status}</Badge></div>
            </Accordion.Toggle>
            <div></div>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
              <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                <div className="col-2 p-0 pt-1 pb-1 text-center">#</div>
                <div className="col-2 p-0 text-center">처방코드</div>
                <div className="col-2 p-0 text-center">검사명</div>
                <div className="col-2 p-0 text-center">용기</div>
                <div className="col-2 p-0 text-center">상태</div>
                <div className="col-2 p-0 text-center">결과값</div>
              </div>
              {group.tests.map((test, index) => {
                return (
                  <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                    <div className="col-2 p-0 pt-1 pb-1 text-center">{index}</div>
                    <div className="col-2 p-0 text-center">{test.testdataid}</div>
                    <div className="col-2 p-0 text-center">{test.testdataname}</div>
                    <div className="col-2 p-0 text-center" style={{color: "orange", fontWeight:"bold"}}>EDTA</div>
                    <div className="col-2 p-0 text-center">{test.status}</div>
                    <div className="col-2 p-0 text-center"> <input type="text" style={{width:"100%"}} ></input></div>
                  </div>
                )
              })}
              
              <div className="mt-3 text-right"><button className="btn btn-info btn-sm mr-2" disabled={group.saveBtn} onClick={Save}>저장</button></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
         )
       })}
      </Accordion>
    </div>

    <Modal show={open} onHide={handleExit} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>바코드 생성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Print/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleExit}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  </>
  );
}
export default TestGroup;