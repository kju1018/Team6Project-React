import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";
import TestReception from "./TestReception";
import TreatmentReception from "./TreatmentReception";

import {getAllTreatmentsData, getAllTestsReceptionData,DeleteReceptionTreatment,DeleteReceptionTest} from "views/Reception/BackEnd/index"
import { useSelector } from "react-redux";
import { GetTreatmentList } from "apis/Reception";
function PatientReception(props){
   const [select, setSelect] = useState("treatmentreception");
   const onChangeSelect=(event)=>{
       setSelect(event.target.value)
    }
    const treatmentReception = useSelector((state)=>(state.receptionReducer.treatmentreception)) 
    const testReception = useSelector((state)=>(state.receptionReducer.testreception))

  
    const [treatementsData, setTreatmentsData] = useState()
    const [testsData, setTestsData] = useState()

    useEffect(()=>{
        GetTreatmentList().then((result)=>{
            setTreatmentsData(result.data);
        })
    },[treatmentReception])
    //진료접수삭제
    const deleteTreatmentsData=(treatment_id)=>{
        let modify = []
        for(var i=0; i<treatementsData.length; i++){
            if(treatementsData[i].treatmentid!==treatment_id){
                modify.push(treatementsData[i]);
            }
        }
        //DB에서 삭제
        DeleteReceptionTreatment(treatment_id)
        setTreatmentsData(modify)
    }
    //검사접수 삭제
    const deleteTestsData=(testreception_id)=>{
        let modify = []
        for(var i=0; i<testsData.length; i++){
            if(testsData[i].testreceptionid!==testreception_id){
                modify.push(testsData[i]);
            }
        }
        //DB에서 삭제
        DeleteReceptionTest(testreception_id)
        setTestsData(modify)
    }
    return(
        <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"calc(45vh - 10px)", backgroundColor:"white"}}>    
            <ReceptionHeader headertitle="접수" iclassName="bi bi-droplet " color="#E89677">
                <select onChange={onChangeSelect} className="ml-2" name="reception" >
                    <option value="treatmentreception">진료접수</option>
                    <option value="testreception">검사접수</option>
                </select>
            </ReceptionHeader> 
            {select==="treatmentreception"?<TreatmentReception isDrawer={false} deleteTreatmentReception={deleteTreatmentsData} patientList={treatementsData}/>:<TestReception isDrawer={false} deleteTestReception={deleteTestsData} patientList={testsData}/>}
        </div>
    )
}

export default PatientReception;