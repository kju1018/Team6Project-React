import { useEffect, useRef, useState } from "react";
import style from "./item.module.css"

function Item(props) {
  const item = props.item
  const property = props.property
  const order = props.order
  const [itemArray, setItemArray] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const refs = useRef();
  useEffect(()=>{
    setIsClicked(false)
  },[])
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
},[])
  
  return (
    
    <div tabindex="0" onClick={(event)=>{if(props.onClick)props.onClick(item); }} className="ml-2 mr-2 mb-2 pt-2 pb-2 d-flex align-items-center" style={{ width:"100%", boxShadow: "rgb(0 0 0 / 8%) 0px 0px 5px 2px",borderRadius:"15px",fontSize: "13px" }}>
    {itemArray.map((item,index)=>{
      return(
        <div key={index}  className={index===0?"col pl-0 pr-0 text-center":"col pl-0 pr-0 text-center border-left"}>
          
          {item}
        </div>
      )
    })}
    </div>
  );
}

export default Item;