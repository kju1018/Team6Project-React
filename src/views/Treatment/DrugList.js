
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "views/components/Item";
import ButtonHeader from "views/Treatment/components/ButtonHeader";
import { getTreatemntDrugs } from "./data/Data";


function DrugList(props) {
  const [drugs, setDrugs] = useState([]);
  useEffect(() => {
    setDrugs(getTreatemntDrugs(props.selectedTreatment.treatmentid));
    console.log("DrugList 데이터 가져옴")
  }, [props])

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