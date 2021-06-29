import "../style/menu.css"
import {slide as Menu}  from "react-burger-menu";
import DrawerReceptions from "./DrawerReceptions";

function Menus(props){
  
  return (
  
 <Menu right  customBurgerIcon={<img src="menu.svg" />} width={"50%"}>
     <DrawerReceptions/>
  </Menu>
  
  );
}
export default Menus;