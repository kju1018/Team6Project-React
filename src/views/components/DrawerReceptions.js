import { useEffect, useState } from "react";

import { getAllTestsReceptionData,DeleteReceptionTreatment,DeleteReceptionTest} from "views/Reception/BackEnd/index"
import { useSelector } from "react-redux";
import TestReception from "views/Reception/PatientReception/TestReception";
import TreatmentReception from "views/Reception/PatientReception/TreatmentReception";
import ChattingMenu from "./Messenger/ChattingMenu";
import { GetTreatmentList } from "apis/Reception";
function DrawerReceptions(props){
    const treatmentReception = useSelector((state)=>(state.receptionReducer.treatmentreception)) 
    const testReception = useSelector((state)=>(state.receptionReducer.testreception))

    const [treatementsData, setTreatmentsData] = useState()
    const [testsData, setTestsData] = useState()

    useEffect(()=>{
        GetTreatmentList().then((result)=>{
            setTreatmentsData(result.data);
        })
    },[treatmentReception])


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
        <div className="bg-white row p-2" style={{height:"100%"}}>
            <div className="col-8" style={{height:"92vh", backgroundColor:"white"}}>
                <div className="pl-3 pr-1  border border-dark" style={{height:"calc(48vh - 8px)"}}>   
                    진료접수
                <TreatmentReception isDrawer={true} deleteTreatmentReception={deleteTreatmentsData} patientList={treatementsData}/> 
                </div>
                <div className="mt-3 pl-3 pr-1  border border-dark" style={{height:"calc(48vh - 8px)"}}>    
                    검사접수
                <TestReception isDrawer={true} deleteTestReception={deleteTestsData} patientList={testsData}/>
                </div>
            </div>
            <div className="col-4  pl-0"style={{height:"96vh", backgroundColor:"white"}}>
                <div className="pl-1 pr-1 pb-3 border border-dark" style={{height:"100%"}}>    
                    메신저
                    <ChattingMenu/>
                </div>
            </div>
           
        </div>
        
    )
}

export default DrawerReceptions;