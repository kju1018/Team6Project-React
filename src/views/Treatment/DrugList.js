
import { useSelector } from "react-redux";
import Item from "views/components/Item";
import ButtonHeader from "views/Treatment/components/ButtonHeader";
import { getTreatemntDrugs } from "./data/Data";


function DrugList(props) {

  const selectedTreatment = useSelector((state) => {
    return state.treatmentReducer.treatment;
  })

  const drugs = getTreatemntDrugs(selectedTreatment.treatmentid);

  return (
    <>
    <ButtonHeader headertitle="처방약 목록" iclassName="bi bi-bag-plus" color="#FFCD82" buttonname="검색"/>
    <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>
      {drugs.map (drug => {
          return (
            <Item key={drug.drugid} item={drug}></Item>
          );
      })}
    </div>
    </>
  );
}

export default DrugList;