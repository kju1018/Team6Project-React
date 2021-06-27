import "../style/menu.css"
import DrawerTestReception from "./DrawerTestReception"
import DrawerTreatmentReception from "./DrawerTreatmentReception"
import {slide as Menu}  from "react-burger-menu";
import { useHistory } from "react-router";
import { useEffect } from "react";
function Menus(props){
  
  return (
    
 <Menu right noOverlay  width={"50%"}>
     <DrawerTestReception></DrawerTestReception>
     <DrawerTreatmentReception></DrawerTreatmentReception>
  </Menu>
  );
}
export default Menus;