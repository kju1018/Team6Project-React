import { sendRedisMessage } from "apis/Redis";
import { createXray, resultStatus } from "apis/test";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Banner from "./Banner";

function TestResult(props) { 
  const [show, setShow] = useState(false);
  const [treatmentid, setTreatmentid] = useState();
  
  useEffect(()=>{ 
    group();
    
  }, [props.testdatas])

  const group = () => {
    let flag = 0;
    for(let i=0; i<props.testdatas.length; i++){ //전체 testdata 리스트의 testdataid 조회
      if(props.testdatas[i]){ 
        if(props.testdatas[i].testdataid === "xray") {
          setTreatmentid(props.testdatas[i].treatmentid);
          flag = 1;
        } 
     }
    } 
    if(flag === 1 ) {
      setShow(true); //testdataid가 xray일 경우에만 보이기
    } else {
      setShow(false)
    }
  }

  const [testimg, setTestimg] = useState({
    treatmentid:"",
    testdataid:""
  }); 

  const inputFile = useRef();

  const handleAdd = async(event) => {
    event.preventDefault(); //고유 동작을 중단
    try{
      const formData = new FormData(); //multipart로 만드는법
      formData.append("treatmentid", treatmentid);
      formData.append("testdataid", "xray");
      formData.append("battach", inputFile.current.files[0]);
      createXray(formData).then(()=>{
        props.gettest(props.selectpatientinfo.testreceptionid);
        sendRedisMessage({type:"testresult", treatmentid:treatmentid})//----------------redis 메세지
        alert("사진첨부 완료")

        inputFile.current.value = ''; //저장후 값 클리어
        let count = 0;
        console.log(props.testdatas)
        if(props.testdatas.length > 0) {
          for(let i=0; i<props.testdatas.length; i++){
            console.log(props.testdatas[i].result)
          if(props.testdatas[i].result !== null || props.testdatas[i].result === ""){
            count++;
            console.log(count)
          }
        }
        if(count+1 === props.testdatas.length) {
          console.log("전체 입력완료")
          resultStatus(props.selectpatientinfo.testreceptionid).then(()=>{
            props.getpatient(props.startdate, props.enddate)
          })
        }
      }
      });
    }catch(error){
      console.log(error);
    }
    
  }

  const handleChange = (event) => { //사용자 입력시 상태 변경을 위해
    setTestimg({
      ...testimg,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
    <div style={{marginBottom:"220px", height:"67%"}}>
    {show ?
    <div className="card">
      <div className="card-header" style={{fontWeight:"bold"}}>
        X-RAY 결과 입력창
      </div>
      <div className="card-body mt-4">
        <div>
          <div>접수번호: {props.selectpatientinfo.testreceptionid}</div>
        </div>
        <hr/>
        <form onSubmit={handleAdd}>
          <div className="form-group row">
            <label htmlFor="treatmentid" className="col-sm-3 col-form-label">treatmentid</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" name="treatmentid" value={treatmentid}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="testdataid" className="col-sm-3 col-form-label">testdataid</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" name="testdataid" value="xray"/>
            </div>
          </div>
          <div className="form-group row">
              <label htmlFor="battach" className="col-sm-3 col-form-label">사진첨부</label>
              <div className="col-sm-8">
                <input id="battach" name="battach" type="file" className="form-control-file" ref={inputFile}/>
              </div>
          </div> 
          <div className="form-group row">
            <div className="col-sm-12 mt-3 d-flex justify-content-center">
              <input type="submit" className="btn btn-dark btn-m mr-2 btn-block" value="추가"/>
            </div>
          </div>
        </form>
      </div>
    </div>
    :<div style={{textAlign:"center", color:"#999999", paddingTop:"35px"}}><div><i className="bi bi-cloud-arrow-up" style={{fontSize:"180px"}}></i></div><div style={{fontSize:"40px"}}>검사 없음</div></div>}
   </div>
    <div style={{height:"15%"}}>
      <div style={{fontSize:"22px", fontWeight:"bold", marginBottom:"5px"}}><i className="bi bi-exclamation-octagon-fill" style={{color:"orange"}}></i> 검사실 주의사항</div>
      <div style={{border:"1px solid black"}}><Banner/></div>
    </div>
    </>
  );
}

export default TestResult;