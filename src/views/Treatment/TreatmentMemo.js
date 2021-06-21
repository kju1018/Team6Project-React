import { useDispatch, useSelector } from "react-redux";

function TreatmentMemo(props) {
  // const dispatch = useDispatch();

  const selectedTreatment = useSelector((state) => {
    return state.treatmentReducer.treatment;
  })

  return (
  <>
    <div className="d-flex align-items-center" style={{height:"50px"}}><i className="bi bi-clipboard-plus mr-1"></i>진료 메모</div>
    <div className="p-3" style={{height:"calc(100% - 50px)"}}>
      <textarea value={selectedTreatment.memo} className="h-100 w-100 " style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", height:"50px", outline:0}}>
      </textarea>
    </div>
  </>
  );
}

export default TreatmentMemo;