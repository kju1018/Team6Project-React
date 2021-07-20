import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function PrescriptionDiagnosesItem(props) {

  return (
    <div className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
      <div style={{width:"25%"}}>{props.item.diagnosesdataid}</div>
      <OverlayTrigger placement="right"
          overlay={<Tooltip>{props.item.diagnosesdataname}</Tooltip>}>
        <div style={{width:"25%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.diagnosesdataname}</div>
      </OverlayTrigger>
      <OverlayTrigger placement="right"
          overlay={<Tooltip>{props.item.diagnosesdataename}</Tooltip>}>
        <div style={{width:"25%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.diagnosesdataename}</div>
      </OverlayTrigger>
      <div style={{width:"25%"}}><button className="btn btn-success btn-sm" onClick={() => {props.addItem(props.item)}}>추가</button></div>
    </div>
  );
}

export default React.memo(PrescriptionDiagnosesItem);