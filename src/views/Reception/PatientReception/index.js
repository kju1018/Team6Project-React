import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";
import TestReception from "./TestReception";
import TreatmentReception from "./TreatmentReception";

import { useDispatch, useSelector } from "react-redux";
import { GetTreatmentList,GetTestReceptionList,DeleteReceptionTreatment,DeleteReceptionTest } from "apis/Reception";
import { createSetTestReception, createSetTreatmentReception } from "redux/reception-reducer";
function PatientReception(props){
   const [select, setSelect] = useState("treatmentreception");
   const onChangeSelect=(event)=>{
       setSelect(event.target.value)
       
    }
    const treatmentReception = useSelector((state)=>(state.receptionReducer.treatmentreception)) 
    const testReception = useSelector((state)=>(state.receptionReducer.testreception))
  
    const [treatementsData, setTreatmentsData] = useState()
    const [testReceptionsData, setTestReceptionsData] = useState()
    const dispatch = useDispatch();
    useEffect(()=>{
        GetTreatmentList().then((result)=>{
            setTreatmentsData(result.data);
        })
    },[treatmentReception])
    useEffect(()=>{
        GetTestReceptionList().then((result)=>{
            setTestReceptionsData(result.data);
            console.log(result.data);
        })
    },[testReception])
    //진료접수삭제
    const deleteTreatmentsData=(treatment_id)=>{
        let modify = []
        for(var i=0; i<treatementsData.length; i++){
            if(treatementsData[i].treatmentid!==treatment_id){
                modify.push(treatementsData[i]);
            }
        }
        //DB에서 삭제
        DeleteReceptionTreatment(treatment_id).then(()=>{
            setTreatmentsData(modify)
            dispatch(createSetTreatmentReception(treatment_id))
        })
        
        
    }
    //검사접수 삭제
    const deleteTestsData=(testreception_id)=>{
        let modify = []
        for(var i=0; i<testReceptionsData.length; i++){
            if(testReceptionsData[i].testreceptionid!==testreception_id){
                modify.push(testReceptionsData[i]);
            }
        }
        //DB에서 삭제
        DeleteReceptionTest(testreception_id).then(()=>{
            setTestReceptionsData(modify)
            dispatch(createSetTestReception(testreception_id))
        })
        
        
    }
    return(
        <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"calc(45vh - 10px)", backgroundColor:"white"}}>    
            <ReceptionHeader headertitle="접수" iclassName="bi bi-droplet " color="#E89677">
                <select onChange={onChangeSelect} className="ml-2" name="reception" >
                    <option value="treatmentreception">진료접수</option>
                    <option value="testreception">검사접수</option>
                </select>
            </ReceptionHeader> 
            {select==="treatmentreception"?<TreatmentReception isDrawer={false} deleteTreatmentReception={deleteTreatmentsData} patientList={treatementsData}/>:<TestReception isDrawer={false} deleteTestReception={deleteTestsData} patientList={testReceptionsData}/>}
        </div>
    )
}

export default PatientReception;