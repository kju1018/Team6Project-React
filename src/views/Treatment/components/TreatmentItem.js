import { Badge } from "react-bootstrap";

function TreatmentItem(props) {

  return (
    <>

    <div onClick={(event)=>{if(props.onClick)props.onClick(props.item);}}
        className={"test ml-2 mr-2 mb-2 pt-2 pb-2 d-flex align-items-center border border-dark"} 
        style={{fontWeight: props.selected===1 ? "bold" : null, backgroundColor: props.selected===1 ? "#3E5799" : null, cursor:"pointer",borderRadius:"7px",fontSize: "13px" }}>
      {props.property.map((prop,index)=>{
        return(
          <div key={index}  className={index===0?"col pl-0 pr-0  text-center":"col pl-0 pr-0 text-center border-left"} 
          style={{color: props.item[prop]==="진료 대기" ? "green" : ((props.item[prop]==="진료 완료") ? "red": (props.item[prop]==="진료중"? (props.selected===1 ? "yellow": "blue") : (props.selected===1 ? "white": "black")))}}>
            {props.item[prop]}
            {props.item.status === "진료 대기" && index === props.property.length - 1 ? <Badge variant="success" className="ml-1">new</Badge> : null}
          </div>
        )
      })}

    </div>
    </>
  );
}

export default TreatmentItem;




