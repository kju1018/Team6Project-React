import Reservation from "./Reservation";
import TestReception from "./TestReception";
import SearchPatient from"./SearchPatient";
import TreatmentReception from "./TreatmentReception";
import { useEffect, useState } from "react";
const InitPatientList = () =>{
    let patientlist=[];
    for(var i=1; i<12; i++){
        const TR = {id:i, name:"name"+i, sex:i%2,age:i,ssn:"950328-1111111",state:"대기중",
        phone:"010-2496-7236",registerday:new Date().toLocaleDateString(), 
        lasttreatment:new Date().toLocaleDateString(),room:"room"+i,ssn1:new Date().toLocaleDateString()  } 
        patientlist.push(TR);
    }
    return patientlist;
}
function Reception(props){
    const [patientList,setpatientList] = useState(InitPatientList);
    useEffect(()=>{
        console.log(patientList);
    },[patientList])
    


    return( 
    <>

    <div className="container-fluid  d-flex" style={{minWidth:"1200px"}}>
        <div className=" col-6 " style={{height:"100%"}}>
            <div style={{padding:"10px"}} >
                <SearchPatient patientList ={patientList}/>
            </div>
            <div style={{padding:"10px"}}>
                <Reservation patientList ={patientList}/>
            </div>
           
        </div>
        <div className=" col-6 " style={{height:"100%"}}>
            <div style={{padding:"10px"}}>
                <TreatmentReception patientList ={patientList}/>
            </div>
            <div style={{padding:"10px"}}>
                <TestReception patientList ={patientList}/>
            </div>
        </div>
        
    </div>
    </>
    )
}

export default Reception;