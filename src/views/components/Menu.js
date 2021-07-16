import "../style/menu.css"
import {slide as Menu}  from "react-burger-menu";
import DrawerReceptions from "./DrawerReceptions";
import { Col, Row, Toast } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Menus(props){
  
  const toast = useSelector((state)=>(state.toastReducer.toast))
  const [showToast,setShowToast] = useState(true); 
  const toggleShowToast = () => setShowToast(!showToast);
  //리덕스 올때마다 토스트 켜줌
  useEffect(()=>{
    setShowToast(true)
  },[toast])

  return (
  <>
 <Menu right  customBurgerIcon={<img src="/menu.svg" />} width={"40%"}>
     <DrawerReceptions/>
  </Menu>
  <div style={{position: "fixed", bottom: "30px", right: "40px",zIndex:"1000"}}>
          <Row>
            <Col style={{width:"400px"}}>
              <Toast onClose={toggleShowToast} show={showToast} delay={5000} autohide>
                <Toast.Header style={{backgroundColor:"#ffc107"}}>
                  <strong className="mr-auto" style={{color:"white"}}>메신저</strong>
                </Toast.Header>
                <Toast.Body>{toast.message}</Toast.Body>
              </Toast>
            </Col>
          </Row>
        </div>
  </>
  );
}
export default Menus;