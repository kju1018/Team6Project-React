import Reservation from "./Reservation";
import SearchPatient from"./SearchPatient";
import { useState } from "react";
import "./font.css"
import PatientReception from "./PatientReception";

function Reception(props){
    return( 
    <>
    <div className="container-fluid  d-flex p-0 " style={{minWidth:"1200px", fontFamily:"Noto Sans KR"}}>
    <div className=" col-6 " style={{height:"100vh"}}>
            <div className="p-2" >
                <SearchPatient />
            </div>           
    </div>
    <div className=" col-6 " style={{height:"100vh"}}>
            <div className="row-6 p-2">
                <Reservation/>         
            </div>
            <div className="row-6 p-2 ">
                <PatientReception/>
            </div>
    </div>
        
    </div>
    </>
    )
}

export default Reception;