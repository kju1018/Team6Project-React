import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";
import TestReception from "./TestReception";
import TreatmentReception from "./TreatmentReception";

import { useDispatch, useSelector } from "react-redux";
import { GetTreatmentList,GetTestReceptionList,DeleteReceptionTreatment,DeleteReceptionTest } from "apis/Reception";
import { createSetTestReception, createSetTreatmentReception } from "redux/reception-reducer";
import { sendRedisMessage } from "apis/Redis";
import { Spinner } from "react-bootstrap";

function PatientReception(props){
   const [select, setSelect] = useState("treatmentreception");
   const onChangeSelect=(event)=>{
       setSelect(event.target.value)
       
    }
    const treatmentReception = useSelector((state)=>(state.receptionReducer.treatmentreception)) 
    const testReception = useSelector((state)=>(state.receptionReducer.testreception))
    const [treatementsData, setTreatmentsData] = useState()
    const [testReceptionsData, setTestReceptionsData] = useState()
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        GetTreatmentList().then((result)=>{
            
            const userlist = result.data.userlist;
            
            const patientlist = result.data.patientlist;
            const treatmentlist = result.data.treatmentlist.map((item, index)=>{
                return {...item, patientname:patientlist[index].patientname,username:userlist[index].username }
            })
            setTreatmentsData(treatmentlist);
            setLoading(false)
        })
    },[treatmentReception])
    useEffect(()=>{
        setLoading(true)
        GetTestReceptionList().then((result)=>{
            console.log(result.data)
            const patientlist = result.data.patientlist;
            const testlist = result.data.testlist.map((item, index)=>{
                return {...item, patientname:patientlist[index].patientname }
            })
            setTestReceptionsData(testlist);
            setLoading(false)
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
            sendRedisMessage({type:"treatment"})
            
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
            sendRedisMessage({type:"test"})
        })
        
        
    }
    return(
        <div className="pl-3 pr-3 pb-3 border border-dark" style={{height:"calc(45vh - 10px)", backgroundColor:"white"}}>    
            <ReceptionHeader headertitle="당일 접수목록" iclassName="bi bi-droplet " color="#E89677">
            {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}
             <select onChange={onChangeSelect} className="ml-2" name="reception" >
                    <option value="treatmentreception">진료접수</option>
                    <option value="testreception">검사접수</option>
                </select>
            </ReceptionHeader> 
          
            {select==="treatmentreception"?<TreatmentReception isDrawer={false} deleteTreatmentReception={deleteTreatmentsData} treatmentList={treatementsData}/>:<TestReception isDrawer={false} deleteTestReception={deleteTestsData} testList={testReceptionsData}/>}

        </div>
    )
}

export default PatientReception;