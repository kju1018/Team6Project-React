function PrescriptionDignosesItem(props) {
  return (
    <div className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
      <div style={{width:"25%"}}>{item.diagnosesdataid}</div>
      <OverlayTrigger placement="right"
          overlay={<Tooltip>{item.diagnosesdataname}</Tooltip>}>
        <div style={{width:"25%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.diagnosesdataname}</div>
      </OverlayTrigger>
      <OverlayTrigger placement="right"
          overlay={<Tooltip>{item.diagnosesdataename}</Tooltip>}>
        <div style={{width:"25%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{item.diagnosesdataename}</div>
      </OverlayTrigger>
      <div style={{width:"25%"}}><button className="btn btn-success btn-sm" onClick={() => {addItme(item)}}>추가</button></div>
    </div>
  );
}

export default PrescriptionDignosesItem;