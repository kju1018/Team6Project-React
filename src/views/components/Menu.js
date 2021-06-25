import "../style/menu.css"
import {slide as Menu}  from "react-burger-menu";
import TestReception from "views/Reception/TestReception";
import TreatmentReception from "views/Reception/TreatmentReception";
import { useHistory } from "react-router";
import { useEffect } from "react";
function Menus(props){
  const history = useHistory();
  let isMenuPath = false;
  useEffect(()=>{
    if(history.location.pathname==="/reception" || history.location.pathname==="/treatment" || history.location.pathname==="/test"){
      isMenuPath  = true; console.log("path1"+isMenuPath)
    }
  },[useHistory()])
  
  return (
    
 <Menu right noOverlay  width={"30%"}>
     <TreatmentReception></TreatmentReception>
     <TestReception></TestReception>
  </Menu>
  );
}
export default Menus;