function TreatmentButtonHeader(props) {
  return (
    <>
      <div className="row align-items-center" style={{height:"50px"}}>
        <div className="col"><i className={props.iclassName}></i>{props.headertitle}</div>
        <div className="col text-right mr-2"><button className="btn btn-info btn-sm" >{props.buttonname}</button></div>
      </div>    
    </>
  );
}

export default TreatmentButtonHeader;