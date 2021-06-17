function PrescriptionHeader(props) {
  return (
    <>
      <div className="row align-items-center" style={props.headerheight}>
        <div className="col">{props.headertitle}</div>
        <div className="col text-right mr-2"><button className="btn btn-info btn-sm" >검색</button></div>
      </div>    
    </>
  );
}

export default PrescriptionHeader;