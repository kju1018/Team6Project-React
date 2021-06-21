function TestHeader() {
  return (
    <div  className="pt-2 pb-2 mb-1 d-flex align-items-center" style={{fontSize:"13px"}}>
      <div className="col p-0 text-center">순서</div>
      <div className="col p-0 text-center" style={{borderLeft:"solid 1px gray"}}>번호</div>
      <div className="col p-0 text-center" style={{borderLeft:"solid 1px gray"}}>이름</div>
      <div className="col p-0 text-center" style={{borderLeft:"solid 1px gray"}}>성별/나이</div>
      <div className="col p-0 text-center" style={{borderLeft:"solid 1px gray"}}>생년월일</div>
      <div className="col p-0 text-center" style={{borderLeft:"solid 1px gray"}}>검사시간</div>
      <div className="col p-0 text-center" style={{borderLeft:"solid 1px gray"}}>상태</div>
      <div className="col p-0 text-center" style={{borderLeft:"solid 1px gray"}}>입력상태</div>
    </div>
  );
}
export default TestHeader;