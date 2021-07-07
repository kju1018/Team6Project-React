import { PrescriptionTest } from "apis/Reception";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSetTestReception } from "redux/reception-reducer";
import { getAllTestsGroupData, ReceptionTest} from "views/Reception/BackEnd/index"

function TestSelectorModal(props){
    //처방된 검사리스트
    const [testList,setTestList] = useState([]);

    const dispatch = useDispatch();

    //처음 컴포넌트 시작시 처방검사 목록 불러오기
    useEffect(()=>{
        PrescriptionTest(props.selectedPatient.patientid).then((result)=>{
            setTestList(result.data.prescriptiontest);
        })
    },[])
    //처방된 검사 선택
    const handleTestList = (event, index) =>{
   
        const modify = testList.map((item,i)=>{
            if(i===index){
                item.ischeck = event.target.checked
            }
            return item;
        })
        setTestList(modify);
    }

    const ResisterTest = () =>{
        //DB에 검사 생성
        const testreception=ReceptionTest(props.selectedPatient.patientid,testList)
        const testreceptionredux = {testList,...testreception}
        //redux에 접수된 검사넘기기
        dispatch(createSetTestReception(testreceptionredux))
        props.closeModal("TestSelectorModal")
    }
    return(
    <div className="conatainer" style={{height:"400px"}}>
      <div className="col border" style={{overflow:"auto" ,borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        {testList&&testList.map((item,index)=>{return(
                                <div key={index}>
                                <input type="checkbox" onChange={(e)=>{handleTestList(e,index)}} value={testList[index].ischeck}/>
                                <label style={{marginLeft:"5px"}}>{item.groupcode}</label>
                                <label style={{marginLeft:"5px"}}>{item.groupname}</label>
                                </div>
                            )})
                        }
        </div>
        <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
            <button disabled={testList&&testList.filter((test)=>(test.ischeck===true)).length>0?false:true} className="btn btn-outline-dark btn-sm" onClick={ResisterTest}>검사접수</button>
        </div>
    </div>
    )
}

export default TestSelectorModal;