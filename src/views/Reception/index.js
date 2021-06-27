import Reservation from "./Reservation";
import SearchPatient from"./SearchPatient";
import { useState } from "react";
import "./font.css"
import PatientReception from "./PatientReception";
const InitPatientList = () =>{
    let patientlist=[];
    for(var i=1; i<12; i++){
        const TR = {id:i, name:"name"+i, sex:i%2,age:i,ssn1:"950328",ssn2:"111111",rstate:i%2?"대기":"접수완료",state:i%2?"wait":"complete",
        phonenumber:"010-2496-7236",registerday:new Date().toLocaleDateString(), reservationtype:i%2?"진료":"검사",
        lasttreatment:new Date().toLocaleDateString(),room:"room"+i  } 
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
            <div className="p-2" >
                <SearchPatient />
            </div>           
    </div>
    <div className=" col-6 " style={{height:"100%"}}>
            <div className="row-6 p-2">
                <Reservation/>         
            </div>
            <div className="row-6 p-2 ">
                <PatientReception patientList ={patientList}/>
            </div>
    </div>
        
    </div>
    </>
    )
}

export default Reception;