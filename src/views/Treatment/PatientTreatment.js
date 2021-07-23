import { useCallback, useEffect } from "react";
import TreatmentItem from "./components/TreatmentItem";
import moment from 'moment';
function PatientTreatment(props) {

  const selectTreatment = useCallback((treatment) => {
    props.selectTreatment(treatment);
  }, [props])

  useEffect(() => {
  }, [props.treatment])
  return (
    <>
      <div className="d-flex row pb-1" style={{height:"50px"}}><div className="p-2 ml-3 mr-2 text-center" style={{ backgroundColor:"#887BD2", width:"40px", color:"#FFFFFF"}}><i className="bi bi-calendar2-check"></i></div><div className="d-flex align-items-center">진료 내역</div></div>
      <div className="d-flex align-items-center pb-1 justify-content-center" style={{height:"50px", width:"100%"}}>
        현재 선택한 진료: {props.treatment.treatmentid}  {props.treatment.treatmentdate} </div>
      {
      props.selectedPatient.patientid != null ? 
      <>
        <div className="overflow-auto p-3" style={{height:"calc(100% - 100px)"}}>
          {
            props.loading === true ? 
            <div className="d-flex h-100 justify-content-center align-items-center">
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            :
            (
              (props.patientTreatments == null || props.patientTreatments.length === 0) ?  
              <div className="overflow-auto p-3 border-top justify-content-center d-flex align-items-center" style={{height:"100%"}}>
                <span><div style={{textAlign:"center", color:"#999999"}}><div><i class="bi bi-clipboard-x" style={{fontSize:"120px"}}></i></div><div style={{fontSize:"16px"}}>선택한 환자의 진료내역이 없습니다.</div></div></span>
              </div>
              : 
              props.patientTreatments.map (treatment => {
                let selected = 0;
                if(treatment.treatmentid === props.treatment.treatmentid){
                  selected = 1;
                } 
                return (
                  <TreatmentItem key={treatment.treatmentid} selected={selected} item={{...treatment, treatmentdate: moment(treatment.treatmentdate).format("YYYY-MM-DD")}} property={["treatmentid", "treatmentdate", "status"]} onClick={selectTreatment}></TreatmentItem>
                );
              })
            )
          }
        </div>
      </>
      :
      <div className="overflow-auto p-3 border-top justify-content-center d-flex align-items-center" style={{height:"calc(100% - 100px)"}}>
        <span><div style={{textAlign:"center", color:"#999999", marginTop:"2px"}}><div><i class="bi bi-person-x" style={{fontSize:"100px"}}></i></div><div style={{fontSize:"20px"}}>환자를 선택해주세요</div></div></span>
      </div>
      }

    </>
  );
}

export default PatientTreatment;




// selectedTreatment.treatmentid === treatment.treatmentid ?  {cursor:"pointer", backgroundColor:"#38B2AC"} : 