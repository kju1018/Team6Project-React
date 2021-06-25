import { useState } from "react";
const InitTestList = () =>{
    let testlist = [];
    for(var i=0; i<20; i++){
        let test = {testid:i, testname:"test"+i, ischeck:false}
        testlist.push(test);
    }
    return testlist;

}
function TestSelectorModal(props){
    //처방된 검사리스트
    const [testList,setTestList] = useState(InitTestList);
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
        console.log(props)
        props.closeModal("TestSelectorModal")
    }
    return(
    <div className="conatainer" style={{height:"400px"}}>
      <div className="col border" style={{overflow:"auto" ,borderRadius:"15px",  marginTop:"15px", height:"70%"}}> 
                        {testList.map((item,index)=>{return(
                                <div>
                                <input type="checkbox" onChange={(e)=>{handleTestList(e,index)}} value={testList[index].ischeck}/>
                                <label style={{marginLeft:"5px"}}>{item.testid}</label>
                                <label style={{marginLeft:"5px"}}>{item.testname}</label>
                                </div>
                            )})
                        }
        </div>
        <div className="col d-flex justify-content-end" style={{borderRadius:"15px",  marginTop:"10px"}}> 
            <button className="btn btn-outline-dark btn-sm" onClick={ResisterTest}>검사접수</button>
        </div>
    </div>
    )
}

export default TestSelectorModal;