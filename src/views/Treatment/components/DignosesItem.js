import { useEffect, useRef, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function DignosesItem(props) {
  
  return (
    <>
    <div tabindex="-1" onClick={(event)=>{if(props.onClick)props.onClick(props.item); }} className={"test ml-2 mr-2 mb-2 pt-2 pb-2 d-flex align-items-center"} style={{ boxShadow: "rgb(0 0 0 / 8%) 0px 0px 5px 2px",borderRadius:"7px",fontSize: "13px" }}>
        <div className={"col text-center"}>{props.item.diagnosesdataid}</div>
        <OverlayTrigger placement="right"
                      overlay={<Tooltip>{props.item.diagnosisdataname}</Tooltip>}>
          <div className={"col text-center border-left"} style={{whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.diagnosisdataname}</div>
        </OverlayTrigger>
        <OverlayTrigger placement="right"
                      overlay={<Tooltip>{props.item.diagnosisdataename}</Tooltip>}>
          <div className={"col text-center border-left"} style={{whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.diagnosisdataename}</div>
        </OverlayTrigger>
    </div>
    </>
  );
}

export default DignosesItem;




