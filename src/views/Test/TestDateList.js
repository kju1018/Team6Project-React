import { useState } from "react";

function TestDateList(props) {
  const [test, setTest] = useState(false);

  const TestList = () => {
    const change = !props.test
    setTest(change);
  }

  return (
    <>
      <div className="mt-2 p-2 text-center" style={{backgroundColor:"#ffffff", borderRadius:"10px", border:"1px solid #BDBDBD"}} onClick={TestList}>2021.01.07</div>
      <div className="mt-2 p-2 text-center" style={{backgroundColor:"#ffffff", borderRadius:"10px"}}>2020.11.22</div>
      <div className="mt-2 p-2 text-center" style={{backgroundColor:"#ffffff", borderRadius:"10px"}}>2020.06.13</div>
      <div className="mt-2 p-2 text-center" style={{backgroundColor:"#ffffff", borderRadius:"10px"}}>2020.03.21</div>
      <div className="mt-2 p-2 text-center" style={{backgroundColor:"#ffffff", borderRadius:"10px"}}>2021.06.24</div>
    </>
  );
}
export default TestDateList;