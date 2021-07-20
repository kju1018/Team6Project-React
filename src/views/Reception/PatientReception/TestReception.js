import { useState } from "react";
import { ToggleButton } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Item from "views/components/Item";
import {createSetPatient} from"redux/patient-reducer"
import moment from 'moment';
import { AutoSizer, List } from "react-virtualized";
function TestReception(props){
    const [listtype, setListtype] = useState("all");
    const [selectedTestReception,setSelectedTestReception] = useState()
    const dispatch = useDispatch();


    const handleChange = (event) => {
        setListtype(event.target.value);
      }
      const click = (item) =>{
        dispatch(createSetPatient({patientid:item.patientid}))
        setSelectedTestReception(item)
    }
    //검사접수삭제
    const deleteReceptionTest = () =>{
        if(selectedTestReception){
            props.deleteTestReception(selectedTestReception.testreceptionid)
        }
       
    }
    const testProperty = ["testreceptionid","patientname","status","testdate",]
    
    return(
        <div className="pl-3 pr-3 pb-3" style={{backgroundColor:"white"}}>
        <div className="mt-3 d-flex justify-content-between">
            <ButtonGroup toggle>
                <ToggleButton type="radio" variant={`${listtype === "all" ? "secondary" : "light" }`} name="type"  checked={listtype==="all"} value="all" onChange={handleChange}><div className="ml-5 mr-5">전체</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "대기중" ? "secondary" : "light" }`} name="type"  checked={listtype==="대기중"} value="대기중" onChange={handleChange}><div className="ml-5 mr-5">대기중</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "진행중" ? "secondary" : "light" }`} name="type"  checked={listtype==="진행중"} value="진행중" onChange={handleChange}><div className="ml-5 mr-5">진행중</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "검사완료" ? "secondary" : "light" }`} name="type"  checked={listtype==="검사완료"} value="검사완료" onChange={handleChange}><div className="ml-5 mr-5">검사완료</div></ToggleButton>
            </ButtonGroup>
            <div>
                {props.isDrawer===false&&<button style={{marginRight:"10px"}} onClick={deleteReceptionTest} className="btn btn-outline-dark btn-sm">취소</button>}
            </div>
        </div>
        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center border " style={{borderRadius:"15px",marginTop:"10px",marginBottom:"10px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>검사ID</div>
                <div style={{width:"20%"}}>환자</div>
                <div style={{width:"20%"}}>접수상태</div>
                <div style={{width:"20%"}}>접수시간</div>
            </div>
            <div className=" justify-content-center" style={{height:"calc(40vh - 200px)"}} >
               
            {props.testList?
            <AutoSizer disableHeight>
                        {({width, height}) => {
                            let result = props.testList.filter((item)=>listtype==="all"||item.status===listtype) 
                            return(
                            <List width={width} height={Math.round(window.innerHeight / (100 / 40))-200}
                                    list={result}
                                    rowCount={result.length}
                                    rowHeight={50}
                                    rowRenderer={({index, key, style}) => {
                                        const item2 = {...result[index],testdate:moment(result[index].testdate).format("HH:mm")}
                                        return (
                                            <div key={key} style={style}>
                                            <Item onClick={click} item ={item2} property={testProperty} order={index}/>
                                            </div>   
                                        );
                                        }}
                                    overscanRowCount={5}/>
                            )
                        }}
            </AutoSizer>
            :
            null
            }


                 {/* {props.testList&&props.testList.map((item,index)=>{
                     const item2 = {...item,testdate:moment(item.testdate).format("HH:mm")}
                      if(listtype==="all"||item.status===listtype){
                     return(
                                    <div key={index}>
                                            <Item onClick={click} item ={item2} property={testProperty} order={index}/>
                                    </div>                         
                 )
                }})}  */}
            </div>
        </div>
                    
    </div>
    )
}

export default TestReception;