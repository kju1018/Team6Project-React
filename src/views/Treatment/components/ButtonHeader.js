function TreatmentButtonHeader(props) {
  return (
    <>
      <div className="row pb-2" style={{height:"50px"}}>
        <div className="col-10 row"><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:props.color, width:"40px", color:"#FFFFFF"}}><i className={props.iclassName}></i></div><div className="d-flex align-items-center">{props.headertitle}</div></div>
        <div className="col-2 mt-3 d-flex align-items-center justify-content-end mr-2" onClick={props.onclick}><i className={`${props.btnicon} mr-1`} style={{fontSize: "1.5rem"}}></i></div>
      </div>    
    </>
  );
}

export default TreatmentButtonHeader;