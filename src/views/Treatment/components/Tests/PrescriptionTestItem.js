import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function PrescriptionTestItem(props) {
  return (
    <div key={props.item.testdataid} className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
      <div style={{width:"20%"}}>{props.item.groupcode}</div>
      <OverlayTrigger placement="right"
          overlay={<Tooltip>{props.item.groupname}</Tooltip>}>
        <div style={{width:"20%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.groupname}</div>
      </OverlayTrigger>
      <div style={{width:"20%"}}>{props.item.testdataid}</div>
      <OverlayTrigger placement="right"
          overlay={<Tooltip>{props.item.testdataname}</Tooltip>}>
        <div style={{width:"20%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.testdataname}</div>
      </OverlayTrigger>
      <div style={{width:"20%"}}><button className="btn btn-success btn-sm" onClick={() => {props.addItem(props.item)}}>추가</button></div>
    </div>
  );
}

export default React.memo(PrescriptionTestItem);