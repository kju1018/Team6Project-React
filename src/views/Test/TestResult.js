import { sendRedisMessage } from "apis/Redis";
import { createXray, testlistByReceptionid } from "apis/test";
import { useEffect, useRef } from "react";
import { useState } from "react";
function TestResult(props) { 
  const [patientid, setPatientid] = useState({});
  const [testdataid, setTestdataid] = useState();
  const [show, setShow] = useState();
  useEffect(()=>{ 
    setPatientid(props.clickdate)
    group();
    
  }, [props.clickdate])

  const group = () => {
    testlistByReceptionid(props.clickdate.testreceptionid).then((response)=>{
    const testdatas = response.data;
    for(let i=0; i<testdatas.length; i++){
      if(testdatas[i]){ 
        if(testdatas[i].testdataid === "xray") {
          setShow(true);
        } else {
          setShow(false)
        }
     }
    } 
  })}

  const [testimg, setTestimg] = useState({
    treatmentid:"",
    testdataid:""
  }); 

  const inputFile = useRef();

  const handleAdd = async(event) => {
    event.preventDefault();
    //console.log(board);
    try{
      const formData = new FormData(); //multipart로 만드는법
      formData.append("treatmentid", testimg.treatmentid);
      formData.append("testdataid", testimg.testdataid);
      formData.append("battach", inputFile.current.files[0]);
      createXray(formData);
    }catch(error){
      console.log(error);
    }
    console.log(testimg.treatmentid)
    sendRedisMessage({type:"treatment", treatmentid:testimg.treatmentid})//----------------redis 메세지
  }

  const handleChange = (event) => { //사용자 입력시 상태 변경을 위해
    setTestimg({
      ...testimg,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
    <div className="card">
      <div className="card-header">
        xray
      </div>
      {show?<div className="card-body">
        <div>
          <div>환자차트번호: {props.clickdate.patientid}</div>
          <div>환자접수번호: {props.clickdate.testreceptionid}</div>
        </div>
        <hr/>
        <form onSubmit={handleAdd}>
          <div className="form-group row">
            <label htmlFor="treatmentid" className="col-sm-3 col-form-label">treatmentid</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" name="treatmentid" value={testimg.treatmentid} onChange={handleChange}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="testdataid" className="col-sm-3 col-form-label">testdataid</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" name="testdataid" value={testimg.testdataid} onChange={handleChange}/>
            </div>
          </div>
          <div className="form-group row">
              <label htmlFor="battach" className="col-sm-3 col-form-label">사진첨부</label>
              <div className="col-sm-8">
                <input id="battach" name="battach" type="file" className="form-control-file" ref={inputFile}/>
              </div>
          </div> 
          <div className="form-group row">
            <div className="col-sm-12 d-flex justify-content-center">
              <input type="submit" className="btn btn-primary btn-sm mr-2" value="추가"/>
            </div>
          </div>
        </form>
      </div>:""}
    </div>
    <div>
    </div>
    </>
  );
}

export default TestResult;