import { useEffect, useState } from "react";
import { getAllTestsGroupData} from "views/Reception/BackEnd/index"

function TestSelectorModal(props){
    //처방된 검사리스트
    const [testList,setTestList] = useState([]);
    //체크된 테스트카운트
    let checkedTestCount=0;

    //처음 컴포넌트 시작시 처방검사 목록 불러오기
    useEffect(()=>{
        var testlist = getAllTestsGroupData(props.selectedPatient.patientid);
        setTestList(testlist);
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
        console.log(testList)
        props.closeModal("TestSelectorModal")
    }
    return(
    <div className="conatainer" style={{height:"400px"}}>
      <div className="col border" style={{overflow:"auto" ,borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        {testList.map((item,index)=>{return(
                                <div key={index}>
                                <input type="checkbox" onChange={(e)=>{handleTestList(e,index)}} value={testList[index].ischeck}/>
                                <label style={{marginLeft:"5px"}}>{item.groupcode}</label>
                                <label style={{marginLeft:"5px"}}>{item.groupname}</label>
                                </div>
                            )})
                        }
        </div>
        <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
            <button disabled={testList.filter((test)=>(test.ischeck===true)).length>0?false:true} className="btn btn-outline-dark btn-sm" onClick={ResisterTest}>검사접수</button>
        </div>
    </div>
    )
}

export default TestSelectorModal;