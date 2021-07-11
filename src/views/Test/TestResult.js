import { createXray } from "apis/test";
import { useRef } from "react";
import { useState } from "react";
function TestResult(props) { 
  console.log(props.click)
  const [testimg, setTestimg] = useState({
    treatmentid:"",
    testdataid:""
  }); 

  const inputFile = useRef();

  const handleAdd = async(event) => {
    event.preventDefault();
    //console.log(board);
    try{
      const formData = new FormData(); //multipart로 만드는법
      formData.append("treatmentid", testimg.treatmentid);
      formData.append("testdataid", testimg.testdataid);
      formData.append("battach", inputFile.current.files[0]);
      await createXray(formData);
    }catch(error){
      console.log(error);
    }
  }

  const handleChange = (event) => { //사용자 입력시 상태 변경을 위해
    setTestimg({
      ...testimg,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
    <div className="card">
      <div className="card-header">
        xray
      </div>
      <div className="card-body">
        <form onSubmit={handleAdd}>
          <div className="form-group row">
            <label htmlFor="treatmentid" className="col-sm-3 col-form-label">treatmentid</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" name="treatmentid" value={testimg.treatmentid} onChange={handleChange}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="testdataid" className="col-sm-3 col-form-label">testdataid</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" name="testdataid" value={testimg.testdataid} onChange={handleChange}/>
            </div>
          </div>
          <div className="form-group row">
              <label htmlFor="battach" className="col-sm-3 col-form-label">battach</label>
              <div className="col-sm-8">
                <input id="battach" name="battach" type="file" className="form-control-file" ref={inputFile}/>
              </div>
          </div> 
          <div className="form-group row">
            <div className="col-sm-12 d-flex justify-content-center">
              <input type="submit" className="btn btn-primary btn-sm mr-2" value="추가"/>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div>
    </div>
    </>
  );
}

export default TestResult;