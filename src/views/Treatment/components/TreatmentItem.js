import { useEffect, useRef, useState } from "react";
import { Badge } from "react-bootstrap";

function TreatmentItem(props) {

  return (
    <>
     <style jsx>{`
        .test:focus {
          background: #B3E283;
          color:black;
        }
        
      `}</style>
    <div tabindex="-1" onClick={(event)=>{if(props.onClick)props.onClick(props.item); }} 
        className={"test ml-2 mr-2 mb-2 pt-2 pb-2 d-flex align-items-center"} style={{ boxShadow: "rgb(0 0 0 / 8%) 0px 0px 5px 2px",borderRadius:"7px",fontSize: "13px" }}>
    {props.property.map((prop,index)=>{
      return(
        <div key={index}  className={index===0?"col pl-0 pr-0 text-center":"col pl-0 pr-0 text-center border-left"}>
          {props.item[prop]}
          {props.item.state === "진료 대기" && index === props.property.length - 1 ? <Badge variant="success" className="ml-1">new</Badge> : null}
        </div>
      )
    })}

    </div>
    </>
  );
}

export default TreatmentItem;




