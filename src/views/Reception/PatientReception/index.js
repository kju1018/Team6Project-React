import { useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";
import TestReception from "./TestReception";
import TreatmentReception from "./TreatmentReception";

import {getAllTreatmentsData, getAllTestsReceptionData} from "views/Reception/BackEnd/index"
function PatientReception(props){
   const [select, setSelect] = useState("treatmentreception");
   const onChangeSelect=(event)=>{
       setSelect(event.target.value)
    }
    const [treatementsData, setTreatmentsData] = useState(getAllTreatmentsData)
    const [testsData, setTestsData] = useState(getAllTestsReceptionData)
 
    return(
        <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"calc(45vh - 15px)", backgroundColor:"white"}}>    
            <ReceptionHeader headertitle="접수" iclassName="bi bi-droplet " color="#E89677">
                <select onChange={onChangeSelect} className="ml-2" name="reception" >
                    <option value="treatmentreception">진료접수</option>
                    <option value="testreception">검사접수</option>
                </select>
            </ReceptionHeader> 
            {select==="treatmentreception"?<TreatmentReception patientList={treatementsData}/>:<TestReception patientList={testsData}/>}
        </div>
    )
}

export default PatientReception;