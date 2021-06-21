import { useSelector } from "react-redux";
import Item from "views/components/Item";
import ButtonHeader from "views/Treatment/components/ButtonHeader";
import { getDiagnoses } from "./data/Data";


function DiagnosisList(props) {

  const selectedTreatment = useSelector((state) => {
    return state.treatmentReducer.treatment;
  })

  const diagnoses = getDiagnoses(selectedTreatment.treatmentid);
  return (
    <>
    <ButtonHeader headertitle="상병 목록" iclassName="bi bi-check2-square" color="#D27E7B" btnicon="bi bi-plus-square" buttonname="추가"/>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>
      {diagnoses.map (diagnosis => {
          return (
            <Item key={diagnosis.diagnosesdataid} item={diagnosis}></Item>
          );
      })}
      </div>
    </>
  );
}

export default DiagnosisList;