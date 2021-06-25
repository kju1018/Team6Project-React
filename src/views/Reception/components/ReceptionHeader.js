function ReceptionHeader(props) {
  return (
    <>
      <div className=" d-flex justify-content-between " style={{height:"46px"}}>
        <div className="d-flex " style={{height:"46px"}}>
        <div className="col-auto justify-content-start  text-center p-0 pt-2" style={{ backgroundColor:props.color, width:"40px", color:"#FFFFFF"}}>
          <i className={props.iclassName}></i>
        </div>
        <div className="p-2 col align-self-center">{props.headertitle}</div>
        </div>
        <div className="align-self-center"> 
        {props.children}
        </div>
        
    
      </div>    
    </>
  );
}

export default ReceptionHeader;