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
    <div className="conatainer" style={{height:"400px"}} >
      <div className="col border" style={{overflow:"auto" ,  marginTop:"15px", height:"70%", padding:0}}> 
                        {/* testList => {groupcode1:[testdata1, testdata2],groupcode2:[testdata3, testdata4]... } */}
                        
                        <table className="table">
                                    <thead  style={{backgroundColor:"#e9ecef"}}>
                                        <tr>
                                            <th>체크</th>
                                            <th>그룹코드</th>
                                            <th >검사명</th>
                                        </tr>
                                    </thead>
                                <tbody>
                        {testList&&testList.map((item,index)=>{
                            
                            return(
                                <>
                                <tr>
                                    <td className="border-bottom   "rowSpan={item[1].length+1} ><input type="checkbox" onChange={(e)=>{handleTestList(e,index)}} value={testList[index].ischeck}/></td>
                                    <td className="border-right  border-bottom   " rowSpan={item[1].length+1}>{item[0]}</td>
                                </tr>
                                    
                                {item[1].map((data,index2)=>{
                                    return(
                                    <tr>
                                        <td className="border-bottom   ">{data.testdataname}</td>
                                    </tr>
                                        
                                        )
                                })}
                                </>
                            )})
                            
                        }
        </tbody>
        </table>
        </div>
        <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
            <button disabled={testList&&testList.filter((test)=>(test.ischeck===true)).length>0?false:true} className="btn btn-outline-dark btn-sm" onClick={ResisterTest}>검사접수</button>
        </div>
    </div>
    )
}

export default TestSelectorModal;