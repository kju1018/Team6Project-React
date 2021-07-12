import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import TestReception from "views/Reception/PatientReception/TestReception";
import TreatmentReception from "views/Reception/PatientReception/TreatmentReception";
import { GetTestReceptionList, GetTreatmentList,DeleteReceptionTreatment,DeleteReceptionTest } from "apis/Reception";
import Chatting from "./Messenger/Chatting";
import ReceptionHeader from "views/Reception/components/ReceptionHeader";

function DrawerReceptions(props){
    const treatmentReception = useSelector((state)=>(state.receptionReducer.treatmentreception)) 
    const testReception = useSelector((state)=>(state.receptionReducer.testreception))

    const [treatementsData, setTreatmentsData] = useState()
    const [testReceptionsData, setTestReceptionsData] = useState()

    useEffect(()=>{
        GetTreatmentList().then((result)=>{
            setTreatmentsData(result.data);
        })
    },[treatmentReception])
    useEffect(()=>{
        GetTestReceptionList().then((result)=>{
            setTestReceptionsData(result.data);
        })
    },[testReception])
    return(
        <div className="bg-white row p-2" style={{height:"100%"}}>
            <div className="col-8" style={{height:"92vh", backgroundColor:"white"}}>
                <div className="pl-3 pr-1  border border-dark" style={{height:"calc(48vh - 8px)"}}>   
                <ReceptionHeader  headertitle="진료접수" iclassName=" bi bi-clipboard-check " color="#e89677"/>
               
                <TreatmentReception isDrawer={true} patientList={treatementsData}/> 
                </div>
                <div className="mt-3 pl-3 pr-1  border border-dark" style={{height:"calc(48vh - 8px)"}}>    
                <ReceptionHeader  headertitle="검사접수" iclassName=" bi bi-clipboard-check " color="#e89677"/>
               
                <TestReception isDrawer={true}  patientList={testReceptionsData}/>
                </div>
            </div>
            <div className="col-4  pl-0"style={{height:"96vh", backgroundColor:"white"}}>
                    <Chatting/>
            </div>
           
        </div>
        
    )
}

export default DrawerReceptions;