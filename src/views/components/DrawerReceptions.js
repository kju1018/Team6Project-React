import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import TestReception from "views/Reception/PatientReception/TestReception";
import TreatmentReception from "views/Reception/PatientReception/TreatmentReception";
import ChattingMenu from "./Messenger/ChattingMenu";
import { GetTestReceptionList, GetTreatmentList,DeleteReceptionTreatment,DeleteReceptionTest } from "apis/Reception";
import Chatting from "./Messenger/Chatting";

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
                    진료접수
                <TreatmentReception isDrawer={true} patientList={treatementsData}/> 
                </div>
                <div className="mt-3 pl-3 pr-1  border border-dark" style={{height:"calc(48vh - 8px)"}}>    
                    검사접수
                <TestReception isDrawer={true}  patientList={testReceptionsData}/>
                </div>
            </div>
            <div className="col-4  pl-0"style={{height:"96vh", backgroundColor:"white"}}>
                <div className="pl-1 pr-1 pb-3 border border-dark" style={{height:"100%"}}>    
                    메신저
                    <Chatting/>
                </div>
            </div>
           
        </div>
        
    )
}

export default DrawerReceptions;