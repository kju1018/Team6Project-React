import { useState } from "react";
import { ToggleButton } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import Item from "views/components/Item";

function TestReception(props){
    const [listtype, setListtype] = useState("all");
    const handleChange = (event) => {
        setListtype(event.target.value);
      }
      const click = (item) =>{
        console.log(item)
    }

    const testProperty = ["testreceptionid","patientid","status","testdate",]
    return(
        <div className="pl-3 pr-3 pb-3" style={{backgroundColor:"white"}}>
        <div className="mt-3 d-flex justify-content-between">
            <ButtonGroup toggle>
                <ToggleButton type="radio" variant={`${listtype === "all" ? "secondary" : "light" }`} name="type"  checked={listtype==="all"} value="all" onChange={handleChange}><div className="ml-5 mr-5">전체</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "대기" ? "secondary" : "light" }`} name="type"  checked={listtype==="대기"} value="대기" onChange={handleChange}><div className="ml-5 mr-5">대기</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "완료" ? "secondary" : "light" }`} name="type"  checked={listtype==="완료"} value="완료" onChange={handleChange}><div className="ml-5 mr-5">완료</div></ToggleButton>
            </ButtonGroup>
            <div>
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">취소</button>
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">수정</button>
            </div>
        </div>
        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>검사ID</div>
                <div style={{width:"20%"}}>환자번호</div>
                <div style={{width:"20%"}}>접수상태</div>
                <div style={{width:"20%"}}>접수시간</div>
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"calc(40vh - 200px)"}} >
               
                 {props.patientList&&props.patientList.map((item,index)=>{
                      if(listtype==="all"||item.status===listtype){
                     return(
                                    <div key={index}>
                                            <Item onClick={click} item ={item} property={testProperty} order={index}/>
                                    </div>                         
                 )
                }})} 
            </div>
        </div>
                    
    </div>
    )
}

export default TestReception;