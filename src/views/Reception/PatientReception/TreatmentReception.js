import {  useState } from "react";
import { ToggleButton } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { useDispatch} from "react-redux";
import Item from "views/components/Item";
import {createSetPatient} from"redux/patient-reducer"
import moment from 'moment';
import { AutoSizer, List } from "react-virtualized";
function TreatmentReception(props){
    const [listtype, setListtype] = useState("all");
    const [selectedTreatmetReception,setSelectedTreatmetReception] = useState()
    const dispatch = useDispatch();


    const handleChange = (event) => {
        setListtype(event.target.value);
      }
      const click = (item) =>{
        dispatch(createSetPatient({patientid:item.patientid}))
        setSelectedTreatmetReception(item)
    }
    //진료접수삭제
    const deleteReceptionTreatment = () =>{
        if(selectedTreatmetReception){
            props.deleteTreatmentReception(selectedTreatmetReception.treatmentid)
            setSelectedTreatmetReception(null)
        }
    }
    
    const treatmentProperty = ["patientname","username","userroom","status","treatmentdate"]  
    return(
        <div className="pl-3 pr-3 pb-3" style={{ backgroundColor:"white"}}>
        <div className="mt-3 d-flex justify-content-between">
            <ButtonGroup toggle>
                <ToggleButton type="radio" variant={`${listtype === "all" ? "secondary" : "light" }`} name="type"  checked={listtype==="all"} value="all" onChange={handleChange}><div className="ml-5 mr-5">전체</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "진료 대기" ? "secondary" : "light" }`} name="type"  checked={listtype==="진료 대기"} value="진료 대기" onChange={handleChange}><div className="ml-5 mr-5">진료 대기</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "진료중" ? "secondary" : "light" }`} name="type"  checked={listtype==="진료중"} value="진료중" onChange={handleChange}><div className="ml-5 mr-5">진료중</div></ToggleButton>
                <ToggleButton type="radio" variant={`${listtype === "진료 완료" ? "secondary" : "light" }`} name="type"  checked={listtype==="진료 완료"} value="진료 완료" onChange={handleChange}><div className="ml-5 mr-5">진료 완료</div></ToggleButton>
            </ButtonGroup>
            <div>
                {props.isDrawer===false&&<button style={{marginRight:"10px"}} onClick={deleteReceptionTreatment} disabled={selectedTreatmetReception==null || selectedTreatmetReception.status!=="진료 대기"} className="btn btn-dark btn-sm">취소</button>}
            </div>
        </div>
        <div className="rounded-lg justify-content-center">
            <div className="d-flex justify-content-between text-center " style={{marginTop:"10px",marginBottom:"10px",color:"white", backgroundColor:"#1B296D", paddingTop:"5px",paddingBottom:"5px"}}>
                <div style={{width:"20%"}}>순번</div>
                <div style={{width:"20%"}}>환자</div>
                <div style={{width:"20%"}}>진료자</div>
                <div style={{width:"20%"}}>진료실</div>
                <div style={{width:"20%"}}>접수상태</div>
                <div style={{width:"20%"}}>접수시간</div>
        
        
            </div>
            <div className="justify-content-center" style={{height:"calc(40vh - 200px)"}} >
            {props.treatmentList?
            <AutoSizer disableHeight>
                        {({width, height}) => {
                            let result = props.treatmentList.filter((item)=>listtype==="all"||item.status===listtype) 
                            return(
                            <List width={width} height={Math.round(window.innerHeight / (100 / 40))-200}
                                    list={result}
                                    rowCount={result.length}
                                    rowHeight={50}
                                    rowRenderer={({index, key, style}) => {
                                        const item2 = {...result[index],treatmentdate:moment(result[index].treatmentdate).format("HH:mm")}
                                        return (
                                            <div key={key} style={style}>
                                            <Item onClick={click} item ={item2} property={treatmentProperty} order={index}/>
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
            


                 {/* {props.treatmentList&&props.treatmentList.map((item,index)=>{
                      const item2 = {...item,treatmentdate:moment(item.treatmentdate).format("HH:mm")}
                      if(listtype==="all"||item.status===listtype){
                     return(
                                    <div key={index}>
                                        
                                        
                                            <Item onClick={click} item ={item2} property={treatmentProperty} order={index}/>
                                    </div>                         
                 )
                }})}  */}
            </div>
        </div>
                    
    </div>
    )
}

export default TreatmentReception;