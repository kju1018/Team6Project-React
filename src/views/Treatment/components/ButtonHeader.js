function ButtonHeader(props) {
  return (
    <>
    <style>
    </style>
      <div className="row pb-1" style={{height:"50px"}}>
        <div className="col-10 row"><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:props.color, width:"40px", color:"#FFFFFF"}}><i className={props.iclassName}></i></div><div className="d-flex align-items-center">{props.headertitle}</div></div>
        <div className="col-2 d-flex align-items-center justify-content-end mr-2"><i onClick={props.onclick} className={`${props.btnicon}`} style={{cursor:"pointer", fontSize: "1.5rem", marginTop:"10px", }}></i></div>
      </div>    
    </>
  );
}

export default ButtonHeader;