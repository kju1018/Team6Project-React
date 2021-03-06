import { useEffect, useState } from "react";
import Item from "views/components/Item";
import {GetPatientList} from "apis/Reception"
import { AutoSizer, List } from "react-virtualized";
function SearchPatientModal(props){
    const property = ["patientid","patientname","ssn1","lasttreatment","registerday"]
    const selectname = ["ID","이름","생년월일","최종진료일","등록일"]
    const [keyword, setKeyword] = useState("");
    const [select, setSelect] = useState(property[0]);
    //원본 list
    const [patientList,setPatientList] = useState([]);
    let focusItem;
    //처음 컴포넌트 시작시 목록 불러옴
    useEffect(()=>{
        //스피너 on
        props.controlLoading(true);
        //DB 불러옴
        GetPatientList().then((result)=>{
            //DB불러온거 상태저장
            setPatientList(result.data)
            //스피너 off
            props.controlLoading(false);
        })
        //모달 닫을때 호출
        return(()=>{
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
        //선택된 환자상태에 저장
       props.setSelectedPatient(focusItem)
       //모달 닫기
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
                        <option key={index} value={item}>{selectname[index]}</option>
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
            
            <div className=" justify-content-center" style={{height:"300px"}} >
            {/* Autosize최적화 */}
            <AutoSizer disableHeight>
            {({width, height}) => {
                
                let tmp = patientList.filter((item)=>{
                    if(item[select]!=null){
                        return item[select].toString().indexOf(keyword)!=-1    
                    }else{
                        var empty=""
                        return empty.indexOf(keyword)!=-1
                    }
                    
                })
                return(
                <List width={width} height={300}
                        list={tmp}
                        rowCount={tmp.length}
                        rowHeight={50}
                        rowRenderer={({index, key, style}) => {
                            return (
                                <div key={key} style={style}>
                                <Item onClick={click} item ={tmp[index]} property={property} order={index}/>
                                </div>   
                            );
                            }}
                        overscanRowCount={5}/>
                )
            }}
            </AutoSizer>


                   {/* {patientList.map((item,index)=>{
                     if(item[select].toString().indexOf(keyword)!=-1){
                        return(
                            <div key={index}>
                                    <Item onClick={click} item ={item} property={property} order={index}/>
                            </div>                         
                            )    
                     }
                         
                     })}   */}
            </div>
        </div>
    </div>
    )
}

export default SearchPatientModal;