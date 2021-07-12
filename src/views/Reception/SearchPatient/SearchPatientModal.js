import { useEffect, useState } from "react";
import Item from "views/components/Item";
import {GetPatientList} from "apis/Reception"
import {Spinner } from "react-bootstrap";
function SearchPatientModal(props){
    const property = ["patientid","patientname","ssn1","lasttreatment","registerday"]
    const [keyword, setKeyword] = useState("");
    const [select, setSelect] = useState(property[0]);
    const [patientList,setPatientList] = useState([]);

    let focusItem;

    //처음 컴포넌트 시작시 목록 불러옴
    useEffect(()=>{
        console.log("modal open!!!!");
        props.controlLoading(true);
        GetPatientList().then((result)=>{
            setPatientList(result.data)
            props.controlLoading(false);
        })
        return(()=>{
            console.log("modal close!!!!");
        })
},[])
    // keyword 적을때 불리는 함수
    const ChangeKeyword = (event) =>{
        setKeyword(event.target.value)
    }
    // Select 바꿀때 불리는 함수
    const ChangeSelect = (event)=>{
        setSelect(event.target.value);
    }
    // 선택 버튼 누를떄 불리는 함수
    const SelectPatient = () =>{
       props.setSelectedPatient(focusItem)
       props.closeModal("SearchPatientModal")
       
    }
    // 환자 div 포커스 선택
    const click = (item) =>{
        focusItem = item; 
    }
    return(
    <div className="conatainer" style={{height:"400px"}}>
          
        <div className="d-flex justify-content-between">
            <div >
                <label style={{marginRight:"10px"}}>검색</label>
                <select onChange={ChangeSelect} style={{marginRight:"10px"}}>
                    {property.map((item,index)=>{return(
                        <option key={index} value={item}>{item}</option>
                    )
                    })}
                </select>
                <input style={{marginRight:"10px"}} onChange={ChangeKeyword} value={keyword} />
              </div>

            <div >
                  <button className="btn btn-outline-dark btn-sm" onClick={SelectPatient}>선택</button>
            </div>
        </div>
        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>ID</div>
                <div style={{width:"20%"}}>이름</div>
                <div style={{width:"20%"}}>생년월일</div>
                <div style={{width:"20%"}}>최종진료일</div>
                <div style={{width:"20%"}}>등록일</div>
            </div>
            
            <div className="overflow-auto  justify-content-center" style={{height:"300px"}} >
                  {patientList.map((item,index)=>{
                     if(item[select].toString().indexOf(keyword)!=-1){
                        return(
                            <div key={index}>
                                    <Item onClick={click} item ={item} property={property} order={index}/>
                            </div>                         
                            )    
                     }
                         
                     })} 
            </div>
        </div>
    </div>
    )
}

export default SearchPatientModal;