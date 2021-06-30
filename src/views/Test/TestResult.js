function TestResult() {
  return (
    <>
  <div className="card">
    <div className="card-header">
      X-Ray
    </div>
    <div className="card-body">
      <form>
        <div className="form-group row">
            <label htmlFor="battach" className="col-sm-4 col-form-label">battach</label>
            <div className="col-sm-8">
              <input id="battach" name="battach" type="file" className="form-control-file"/>
            </div>
        </div> 
        <div className="form-group row">
          <div className="col-sm-12 d-flex justify-content-center">
            <input type="submit" className="btn btn-primary btn-sm mr-2" value="추가"/>
            <input type="button" className="btn btn-primary btn-sm" value="취소"/>
          </div>
        </div>
      </form>
    </div>
  </div>
  </>
  );
}
export default TestResult;