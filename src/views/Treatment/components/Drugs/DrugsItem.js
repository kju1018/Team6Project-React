import { OverlayTrigger, Tooltip } from "react-bootstrap";

function DrugsItem(props) {
  
  return (
    <>
    <div tabIndex="-1" onClick={(event)=>{if(props.onClick)props.onClick(props.item); }} className={"test ml-2 mr-2 mb-2 pt-2 pb-2 d-flex align-items-center border border-dark "} style={{borderRadius:"7px",fontSize: "13px" }}>
        <div className={"col text-center"}>{props.item.drugid}</div>
        <OverlayTrigger placement="right"
                      overlay={<Tooltip>{props.item.drugname}</Tooltip>}>
          <div className={"col text-center border-left"} style={{whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.drugname}</div>
        </OverlayTrigger>
        <div className={"col text-center border-left"} style={{whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.drugtype}</div>
        <div className={"col text-center border-left"} style={{whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipsis"}}>{props.item.quantity} {props.item.drugunit}</div>
    </div>
    </>
  );
}

export default DrugsItem;




