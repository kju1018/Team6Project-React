import { useEffect, useState } from "react";
import { Badge, Button, Modal, Accordion, Card  } from "react-bootstrap";
import xlsx from 'xlsx';
import React from 'react';
import Print from "./Print";
import { testlistByReceptionid, startTests, cancelTests, finishTests, startPatient, cancelPatient, finishPatient, insertResult } from "apis/test";

function TestGroup(props) {
  const [open, setOpen] = useState(false); //모달 열림/닫힘 상태
  const [groupList, setGroupList] = useState({}); //제일 바깥
  const [excel, setExcel] = useState([]);
  const [patientid, setPatientid] = useState({});
  const [data, setData] = useState({}); 

  useEffect(()=>{ 
    setPatientid(props.clickdate)
    group();

  }, [props.clickdate.testreceptionid])

  const group = () => {testlistByReceptionid(props.clickdate.testreceptionid).then((response)=>{
    const testdatas = response.data;
    setExcel(testdatas)

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
  })}
  const handleExit = () => setOpen(false); //바코드 모달 닫힘

  const changeHandler = (e, groupcode) => { //체크버튼 선택 시, ischeck 변경해줌 
    const modify = Object.values(groupList).map((group)=>{
      if(group.groupcode===groupcode){
        group.ischeck = e.target.checked
      }
      return group;
    })
    setGroupList(modify)
  }

  const handleStart = async(groupList) => {
    let checkedList = [];
    let flag = 0;
 
    const newGroupList = Object.values(groupList).map ((group) => {

      if(group.ischeck === true){
        group.ischeck = false;
        if(group.status === "대기중"){
          checkedList.push(group);
          
        } else {
          alert("검사가 이미 진행중이거나 완료 되었습니다.")
          flag = 1;
        }
      }
    
      return group;
    });

    if(flag === 0){
      try {
        startTests(checkedList).then(()=>{group()});
        startPatient(props.clickdate.testreceptionid).then(()=>{ props.getpatient(props.startdate, props.enddate)});
      } catch (error) {
        console.log(error);
      }

    }
    
    setGroupList(newGroupList);

  }

  const handleExcel =() => { //엑셀 버튼 클릭 시, 동작하는 함수
    const ws = xlsx.utils.json_to_sheet(excel); //안에 배열의 객체 넣으면 그대로 출력
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "환자차트번호:"+patientid.patientid+"_"+patientid.testdate+".xlsx");
  }

  const handlePrint = async(groupList) => { 
    let checkedList = [];
    let flag = 0;
 
    const newGroupList = Object.values(groupList).map ((group) => {
      if(group.ischeck === true){
        setOpen(true);
        group.ischeck = false;
        if(group.status === "대기중"){
          checkedList.push(group);
        } else {
          alert("검사가 이미 진행중이거나 완료 되었습니다.")
          flag = 1;
        }
      }
      return group;
    });

    if(flag === 0){
      try {
        startTests(checkedList).then(()=>{group()});
        startPatient(props.clickdate.testreceptionid).then(()=>{props.getpatient(props.startdate, props.enddate)});
      } catch (error) {
        console.log(error);
      }
    }
    setGroupList(newGroupList);
  }

  const handleCancel = async(groupList) => { 
    let checkedList = [];
    let flag = 0;
    
    const newGroupList = Object.values(groupList).map ((group) => {
      if(group.ischeck === true){
        group.ischeck = false;
        if(group.status === "진행중"){
          checkedList.push(group);
        } else {
          if(group.status === "대기중") {
            alert("검사가 대기중입니다..")
          } else {
            alert("검사가 이미 완료되었습니다.")
          }
          flag = 1;
        }
      }
      return group;
    });
    if(flag === 0){
      try {
        cancelTests(checkedList).then(()=>{group();})
        cancelPatient(props.clickdate.testreceptionid).then(()=>{props.getpatient(props.startdate, props.enddate)})
        
      } catch (error) {
        console.log(error);
      }
     
    }
    setGroupList(newGroupList);
  }

  const handleFinish = async(groupList) => { 
    let checkedList = [];
    let flag = 0;
    
    const newGroupList = Object.values(groupList).map ((group) => {
      if(group.ischeck === true){
        group.ischeck = false;
        if(group.status === "진행중"){
          checkedList.push(group);
        } else {
          if(group.status === "대기중") {
            alert("검사를 먼저 시작해주세요")
          } else {
            alert("검사가 이미 완료되었습니다.")
          }
          flag = 1;
        }
      }
      return group;
    });
    if(flag === 0){
      try {
        finishTests(checkedList).then(()=>{group()})
        finishPatient(props.clickdate.testreceptionid).then(()=>{props.getpatient(props.startdate, props.enddate)})
      } catch (error) {
        console.log(error);
      }
  
    }
    setGroupList(newGroupList);
  }

  const handleAdd = async(event) => {
    event.preventDefault();
    await insertResult(data).then(()=>{group()});
    //다시 검사리스트 가져오기
    setData({});//이전에 입력한 결과값 초기화 
  }

  const handleChange = (event, index, test) => { //사용자 입력시 상태 변경을 위해
    setData({
      ...test,
      [event.target.name]: event.target.value
    })
    console.log(test)
  }
//{test test test}
  /*
  [
    {
      [test.result, test, test]
    }
  ]


  */
  
  return (
    <>
    <div className="mt-2 mb-2 text-right">
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ () => { handleStart(groupList) }} value="검사시작">검사시작</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ () => {handlePrint(groupList) }} value="바코드출력">바코드출력</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ () => {handleCancel(groupList) }} value="접수취소">접수취소</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ handleExcel}>엑셀저장</button>
      <button type="button" className="btn btn-dark btn-sm mr-1" onClick={ () => {handleFinish(groupList) }} value="검사완료">검사완료</button>
    </div> 
    <div>검사접수번호: {props.clickdate.testreceptionid}</div>
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
                <div className="col-2 p-0 text-center">처방코드</div>
                <div className="col-2 p-0 text-center">검사명</div>
                <div className="col-2 p-0 text-center">용기</div>
                <div className="col-1 p-0 text-center">상태</div>
                <div className="col-5 p-0 text-center">결과값</div>
              </div>
              {group.tests.map((test, index) => {
                return (
                  <div className="pt-2 pb-2 mb-2 d-flex align-items-center" style={{ fontSize:"13px", borderBottom:"1px solid #a6a6a6"}}>
                    <div className="col-2 p-0 text-center">{test.testdataid}</div>
                    <div className="col-2 p-0 text-center">{test.testdataname}</div>
                    <div className="col-2 p-0 text-center" style={{color: "orange", fontWeight:"bold"}}>{test.testcontainer}</div>
                    <div className="col-1 p-0 text-center">{test.status}</div>
                    <div className="col-5 p-0 pl-4 text-center" style={{display:"inline-flex"}}>
                      <form onSubmit={handleAdd}>
                        <div style={{float:"left", width:"68%"}}><input type="text" className="form-control" name="result" value={test.result} onChange={e => {handleChange(e, index, test)}} /></div>
                        <div style={{float:"right"}}><input type="submit" className="btn btn-primary btn-sm mr-2"  disabled={group.saveBtn} value="추가"/></div>
                      </form>
                    </div>
                  </div>
                )
              })}
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
      <Print clickdate={patientid} grouplist={groupList}/>
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