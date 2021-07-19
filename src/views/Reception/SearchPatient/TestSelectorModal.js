import { PrescriptionTest ,ReceptionTest} from "apis/Reception";
import { sendRedisMessage } from "apis/Redis";

import { useEffect, useState } from "react";

function TestSelectorModal(props){
    //처방된 검사리스트
    const [testList,setTestList] = useState([]);


    //처음 컴포넌트 시작시 처방검사 목록 불러오기
    useEffect(()=>{
        props.controlLoading(true);
        PrescriptionTest(props.selectedPatient.patientid).then((result)=>{
           var entry = Object.entries(result.data)
           for(var en of entry){
               en["ischeck"] = false
           }

            setTestList(entry);
            props.controlLoading(false);
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
        //만약 예약된거라면 예약에서 지우기
        if(props.CancelReservation){
            props.CancelReservation()
        }
        //DB에 검사 생성
        let testdataidlist=[]
        for(var testdataArray of testList){
            if(testdataArray.ischeck){
                for(var data of testdataArray[1]){
                    testdataidlist.push(data.testdataid);
                }
            }
        }
        const testreceptionarg = {patientid:props.selectedPatient.patientid, testdataidlist}
        ReceptionTest(testreceptionarg).then((result)=>{
            console.log(result.data)
            //redux에 접수된 검사넘기기
            //dispatch(createSetTestReception(result.data))
            sendRedisMessage({type:"test"})
            props.closeModal("TestSelectorModal")
        })
       
    }
    return(
    <div className="conatainer" style={{height:"400px"}}>
      <div className="col border" style={{overflow:"auto" ,borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        {/* testList => {groupcode1:[testdata1, testdata2],groupcode2:[testdata3, testdata4]... } */}
                        {testList&&testList.map((item,index)=>{
                            
                            return(
                                <div key={index}>
                                <input type="checkbox" onChange={(e)=>{handleTestList(e,index)}} value={testList[index].ischeck}/>
                                <span style={{marginLeft:"5px"}}>그룹코드 : {item[0]}</span>
                                {<span> 검사 : </span>}
                                {item[1].map((data,index)=>{
                                    return(<span>{data.testdataname} / </span>)
                                })}
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