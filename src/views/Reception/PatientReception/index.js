import { useEffect, useState } from "react";
import ReceptionHeader from "../components/ReceptionHeader";
import TestReception from "./TestReception";
import TreatmentReception from "./TreatmentReception";
import { Col, Row, Toast } from "react-bootstrap";
import {useDispatch, useSelector } from "react-redux";
import { GetTreatmentList,GetTestReceptionList,DeleteReceptionTreatment,DeleteReceptionTest } from "apis/Reception";
import { sendRedisMessage } from "apis/Redis";
import { Spinner } from "react-bootstrap";
import { createSetToast } from "redux/toast-reducer";
import { createSetTreatmentReception } from "redux/reception-reducer";

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
    const [showToast,setShowToast] = useState({onoff:false, patientname:"", status:""}); 
    const toggleShowToast = () => {setShowToast((prev)=>({...prev,onoff:!prev.onoff}))}
    const dispatch = useDispatch()

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
            console.log(treatmentReception)
            //진료접수가 완료되면 토스트    
            if((treatmentReception.status==="완료") || (treatmentReception.status==="진행") ){
                var patientname = treatmentlist.filter((item)=>{return item.patientid===treatmentReception.patientid})[0].patientname
                setShowToast((prev)=>({status:treatmentReception.status,patientname,onoff:true}))
                dispatch(createSetTreatmentReception({status:"",patientname,onoff:false}))
            }
        })
    },[treatmentReception])
    useEffect(()=>{
        setLoading(true)
        GetTestReceptionList().then((result)=>{
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
        let selectedtreatment= null
        for(var i=0; i<treatementsData.length; i++){
            if(treatementsData[i].treatmentid!==treatment_id){
                modify.push(treatementsData[i]);
            }else{
                selectedtreatment = treatementsData[i]
            }
        }
        //DB에서 삭제
        DeleteReceptionTreatment(treatment_id).then(()=>{
            setTreatmentsData(modify)
            sendRedisMessage({type:"treatment", patientid:selectedtreatment.patientid , status:"취소"})
            
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


            <div style={{position: "fixed", bottom: "130px", right: "40px",zIndex:"1000"}}>
          <Row>
            <Col style={{width:"400px"}}>
              <Toast onClose={toggleShowToast} show={showToast.onoff} delay={5000} autohide >
                <Toast.Header style={{backgroundColor:"#E89677"}}>
                  <strong className="mr-auto" style={{color:"white"}}>진료메시지</strong>
                </Toast.Header>
                <Toast.Body>{showToast.patientname}님의 진료가 {showToast.status}되었습니다.  </Toast.Body>
              </Toast>
            </Col>
          </Row>
        </div>
        </div>
    )
}

export default PatientReception;