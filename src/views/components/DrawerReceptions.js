import { useEffect, useState } from "react";

import {getAllTreatmentsData, getAllTestsReceptionData,DeleteReceptionTreatment,DeleteReceptionTest} from "views/Reception/BackEnd/index"
import { useSelector } from "react-redux";
import TestReception from "views/Reception/PatientReception/TestReception";
import TreatmentReception from "views/Reception/PatientReception/TreatmentReception";
function DrawerReceptions(props){
    const treatmentReception = useSelector((state)=>(state.receptionReducer.treatmentreception)) 
    const testReception = useSelector((state)=>(state.receptionReducer.testreception))

    const [treatementsData, setTreatmentsData] = useState(getAllTreatmentsData)
    const [testsData, setTestsData] = useState(getAllTestsReceptionData)
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
        <>
        <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"45vh", backgroundColor:"white"}}>   
            진료접수
          <TreatmentReception isDrawer={true} deleteTreatmentReception={deleteTreatmentsData} patientList={treatementsData}/> 
           
        </div>
        <div className="mt-3 pl-3 pr-3 pb-3 border border-dark" style={{height:"45vh", backgroundColor:"white"}}>    
            검사접수
         <TestReception isDrawer={true} deleteTestReception={deleteTestsData} patientList={testsData}/>
        </div>
        </>
        
    )
}

export default DrawerReceptions;