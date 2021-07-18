import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function PrescriptionDrugItem(props) {
  console.log(props.item.drugid," 렌더링");

  const handleChange = (event) => {
    props.onChangeQuantity(event, props.quantityArr);
  }

  return (
    <div key={props.item.drugid} className="d-flex text-center pt-1 pb-1 align-items-center border-bottom" style={{height:"50px", fontWeight:"bold"}}>
      <div style={{width:"25%"}}>{props.item.drugid}</div>
      <OverlayTrigger placement="right"
          overlay={<Tooltip>{props.item.drugname}</Tooltip>}>
        <div style={{width:"25%", whiteSpace: "nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.drugname}</div>
      </OverlayTrigger>
      <div className="d-flex" style={{width:"25%"}}>
        <div style={{width:"60%", marginRight:"3px"}}>
          <input min={1} type="number" name={props.item.drugid} value={props.quantityArr[props.item.drugid] || 1} onChange={handleChange} className="form-control"></input>
        </div>
        <div style={{width:"40%"}}>{props.item.drugunit}</div>
      </div>
      <div style={{width:"25%"}}><button className="btn btn-success btn-sm" onClick={() => {props.addItem(props.item, props.quantityArr[props.item.drugid], props.quantityArr)}}>추가</button></div>
    </div>
  );
}

export default React.memo(PrescriptionDrugItem);