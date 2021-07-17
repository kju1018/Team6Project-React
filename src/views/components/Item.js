import React from "react";
import { useEffect, useRef, useState } from "react";

function Item(props) {

  const item = props.item
  const property = props.property
  const order = props.order
  const [itemArray, setItemArray] = useState([]);
  useEffect(()=>{
    let itemarray = [];
    if(order!=null){
      itemarray.push(order)
    }
    if(property==null){
      for(var ip in item){
        itemarray.push(item[ip])
      }
    }
    else{
      for(var i=0; i<property.length; i++){
        itemarray.push(item[property[i]]); 
       }
    }
      setItemArray(itemarray);
},[item])
  
  return (
    <>
     <style jsx="true">{`
     
        .test:focus {
          background: #B3E283;
          color:black;
        }
        
      `}</style>
    <div tabIndex="-1" onClick={(event)=>{if(props.onClick)props.onClick(item); }} className={"test ml-2 mr-2 mb-2 pt-2 pb-2 d-flex align-items-center border-bottom  "} style={{ fontSize: "13px" }}>
    {itemArray.map((item,index)=>{
      return(
        <div key={index}  className="col pl-0 pr-0 text-center">
          {item}
        </div>
      )
    })}
    </div>
    </>
  );
}

export default React.memo(Item);




