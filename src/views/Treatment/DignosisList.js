import Item from "views/components/Item";
import ButtonHeader from "./components/ButtonHeader";


function DiagnosisList(props) {

  return (
    <>
    <ButtonHeader headertitle="상병 목록" iclassName="bi bi-check2-square" color="#D27E7B" btnicon="bi bi-plus-square" buttonname="추가"/>
      <div className="overflow-auto p-3" style={{height:"calc(100% - 50px"}}>
      {props.diagnoses.map (diagnosis => {
          return (
            <Item key={diagnosis.diagnosesdataid} item={diagnosis}></Item>
          );
      })}
      </div>
    </>
  );
}

export default DiagnosisList;