import { useEffect, useState } from "react";

function TreatmentMemo(props) {

  const handlechange = (event) => {
    props.setMemo(event.target.value);
  }

  useEffect(() => {
    return (() =>{
      props.setMemo("")
    });

  }, [props.treatment])

  return (
  <>
    <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#887BD2", width:"40px", color:"#FFFFFF"}}><i className="bi bi-clipboard-plus"></i></div><div className="d-flex align-items-center">진료 메모</div></div>
    <div className="p-3" style={{height:"calc(100% - 50px)"}}>
      <textarea value={props.treatment.status === "진료 대기" ? 
      props.memo
      : 
      (props.treatment.memo == null ? "" : props.treatment.memo)} onChange={props.treatment.status !== "진료 대기" ? null : handlechange} readOnly={props.treatment.status !== "진료 대기"? true : false} className="h-100 w-100 " style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", height:"50px", outline:0}} >
      </textarea>
      {/* treatmentstate가 진료 대기이면 가능 완료이면 readonly*/}
    </div>
  </>
  );
}

export default TreatmentMemo;