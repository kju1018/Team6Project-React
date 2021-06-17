import Item from "views/components/Item";

function PatientWaiting(props) {
  return (
    <>
    <div className="d-flex align-items-center" style={{height:"50px"}}>현재 대기 환자</div>
    <button className="btn btn-info btn-sm">대기</button> <button className="btn btn-info btn-sm">완료</button>
    <div className={`overflow-auto p-3`} style={{height:"calc(100% - 50px)"}}>
      <Item/>
    </div>
    </>
  );
}

export default PatientWaiting;