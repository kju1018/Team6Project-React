import { useState } from "react";
import { ToggleButton } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import Item from "views/components/Item";
import TreatmentButtonHeader from "views/Treatment/components/ButtonHeader";
import ReceptionHeader from "../components/ReceptionHeader";

function TestReception(props){
    const [listtype, setListtype] = useState("all");
    const handleChange = (event) => {
        setListtype(event.target.value);
      }
      const click = (item) =>{
        console.log(item)
    }
    const property = ["id","name","room","state","registerday"]
    return(
        <div className="pl-3 pr-3 pb-3" style={{height:"435px", backgroundColor:"white"}}>
            
            <ReceptionHeader headertitle="검사접수" iclassName="bi bi-droplet " color="#E89677">
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">검사취소</button>
                <button style={{marginRight:"10px"}} className="btn btn-outline-dark btn-sm">수정</button>
            </ReceptionHeader>
        <div className="mt-1">
            <ButtonGroup toggle>
                <ToggleButton type="radio" variant={`${listtype === "all" ? "secondary" : "light" }`} name="type"  checked={listtype==="all"} value="all" onChange={handleChange}><div className="ml-5 mr-5">전체</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "wait" ? "secondary" : "light" }`} name="type"  checked={listtype==="wait"} value="wait" onChange={handleChange}><div className="ml-5 mr-5">대기</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "complete" ? "secondary" : "light" }`} name="type"  checked={listtype==="complete"} value="complete" onChange={handleChange}><div className="ml-5 mr-5">완료</div></ToggleButton>
            </ButtonGroup>
        </div>
        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>ID</div>
                <div style={{width:"20%"}}>이름</div>
                <div style={{width:"20%"}}>검사실</div>
                <div style={{width:"20%"}}>검사상태</div>
                <div style={{width:"20%"}}>접수시간</div>
        
        
            </div>
            <div className="overflow-auto  justify-content-center" style={{height:"294px"}} >
               
                 {props.patientList&&props.patientList.map((item,index)=>{
                      if(listtype==="all"||item.state===listtype){
                     return(
                                    <div key={index}>
                                            <Item onClick={click} item ={item} property={property} order={index}/>
                                    </div>                         
                 )
                }})} 
            </div>
        </div>
                    
    </div>
    )
}

export default TestReception;