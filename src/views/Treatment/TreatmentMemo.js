function TreatmentMemo(props) {
  return (
  <>
    <div className="d-flex align-items-center" style={{height:"50px"}}>진료 메모</div>
    <div className="p-3" style={{height:"calc(100% - 50px)"}}>
      <textarea className="h-100 w-100 " style={{boxShadow:"rgb(0 0 0 / 8%) 0px 0px 5px 2px", borderRadius:"15px", height:"50px", outline:0}}>
      </textarea>
    </div>
  </>
  );
}

export default TreatmentMemo;