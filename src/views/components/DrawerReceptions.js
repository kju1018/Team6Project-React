import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import TestReception from "views/Reception/PatientReception/TestReception";
import TreatmentReception from "views/Reception/PatientReception/TreatmentReception";
import { GetTestReceptionList, GetTreatmentList } from "apis/Reception";
import Chatting from "./Messenger/Chatting";
import ReceptionHeader from "views/Reception/components/ReceptionHeader";
import { ButtonGroup, Spinner, ToggleButton } from "react-bootstrap";

function DrawerReceptions(props){
    const treatmentReception = useSelector((state)=>(state.receptionReducer.treatmentreception)) 
    const testReception = useSelector((state)=>(state.receptionReducer.testreception))

    const [treatementsData, setTreatmentsData] = useState()
    const [testReceptionsData, setTestReceptionsData] = useState()
    const [loading,setLoading] = useState(false);
    
    const [listtype, setListtype] = useState("접수목록");

    const handleChange = (event) => {
        setListtype(event.target.value);
      }
    useEffect(()=>{
        setLoading(true)
        GetTreatmentList().then((result)=>{
             
            const userlist = result.data.userlist;
            
            const patientlist = result.data.patientlist;
            const treatmentlist = result.data.treatmentlist.map((item, index)=>{
                return {...item, patientname:patientlist[index].patientname,username:userlist[index].username,userroom:userlist[index].userroom }
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

    return(
        <>
         <ButtonGroup toggle>
                 <ToggleButton type="radio" style={{color:"white"}}  variant= {`${listtype === "접수목록" ? "success" : "" }`} name="type"  checked={listtype==="접수목록"} value="접수목록" onChange={handleChange}><div className="ml-5 mr-5">접수목록(당일)</div></ToggleButton>
                <ToggleButton type="radio" style={{color:"white"}} variant={`${listtype === "메신저" ? "success" : "" }`} name="type"  checked={listtype==="메신저"} value="메신저" onChange={handleChange}><div className="ml-5 mr-5">메신저</div></ToggleButton>
        </ButtonGroup>
        <div className="bg-white row p-2" style={{height:"calc(100vh-38px)"}}>
            
            
        <div className="col" style={{height:"calc(92vh-38px)", backgroundColor:"white",display:listtype==="접수목록"?"block": "none"}}>
            <div className="pl-3 pr-1  border border-dark" style={{height:"calc(48vh - 25px)"}}>   
            <ReceptionHeader  headertitle="진료접수" iclassName=" bi bi-clipboard-check " color="#e89677">
            {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}
            </ReceptionHeader>
           
            <TreatmentReception isDrawer={true} treatmentList={treatementsData}/> 
            </div>
            <div className="mt-3 pl-3 pr-1  border border-dark" style={{height:"calc(48vh - 25px)"}}>    
            <ReceptionHeader  headertitle="검사접수" iclassName=" bi bi-clipboard-check " color="#e89677">
            {loading?<Spinner as="span" animation="border" variant="info" size="lg" role="status" className="ml-2"/>:null}
            </ReceptionHeader>
           
            <TestReception isDrawer={true}  testList={testReceptionsData}/>
            </div>
        </div>
        
        <div className="col"style={{height:"calc(92vh-38px)", backgroundColor:"white",display:listtype==="메신저"?"block": "none"}}>
                <Chatting/>
        </div>
            
            
            
           
        </div>
        </>
    )
}

export default DrawerReceptions;