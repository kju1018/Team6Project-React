

function PatientItem(props) {

  return (
    <>

<div onClick={(event)=>{if(props.onClick)props.onClick(props.item); }} className={"ml-2 mr-2 pt-2 pb-2 d-flex align-items-center border-bottom"} 
      style={props.selected === props.item.patientid ? 
              {backgroundColor: "#3E5799", color:"white", fontWeight:"bold", height:"50px", fontSize: "13px"}
              :
              {height:"50px", fontSize: "13px"}}>

      {props.property.map((prop,index)=>{
        return(
          <div key={index}  className="col pl-0 pr-0  text-center">
            {props.item[prop]}
          </div>
        )
      })}

    </div>
    </>
  );
}

export default PatientItem;




