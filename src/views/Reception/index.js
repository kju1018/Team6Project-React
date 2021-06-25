import Reservation from "./Reservation";
import TestReception from "./TestReception";
import SearchPatient from"./SearchPatient";
import TreatmentReception from "./TreatmentReception";
import { useEffect, useState } from "react";
import "./font.css"
const InitPatientList = () =>{
    let patientlist=[];
    for(var i=1; i<12; i++){
        const TR = {id:i, name:"name"+i, sex:i%2,age:i,ssn1:"950328",ssn2:"111111",rstate:i%2?"대기":"접수완료",state:i%2?"wait":"complete",
        phone:"010-2496-7236",registerday:new Date().toLocaleDateString(), reservationtype:i%2?"진료":"검사",
        lasttreatment:new Date().toLocaleDateString(),room:"room"+i,ssn1:new Date().toLocaleDateString()  } 
        patientlist.push(TR);
    }
    return patientlist;
}
function Reception(props){
    const [patientList,setpatientList] = useState(InitPatientList);

    return( 
    <>
    <div className="container-fluid  d-flex p-0 " style={{minWidth:"1200px", fontFamily:"Noto Sans KR"}}>
    <div className=" col-6 " style={{height:"100%"}}>
            <div className="row-6 p-2" >
                <SearchPatient patientList ={patientList}/>
            </div>
            <div className="row-6 p-2">
                <Reservation patientList ={patientList}/>
            </div>
           
        </div>
        <div className=" col-6 " style={{height:"100%"}}>
            <div className="row-6 p-2">
                <TreatmentReception patientList ={patientList}/>
            </div>
            <div className="row-6 p-2">
                <TestReception patientList ={patientList}/>
            </div>
        </div>
        
    </div>
    </>
    )
}

export default Reception;