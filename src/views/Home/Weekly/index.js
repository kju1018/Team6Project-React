import { forwardRef, useState } from "react";
import { Table } from "react-bootstrap";
import WeeklyForm from "./WeeklyForm";
import DatePicker from "react-datepicker";
import "./scrollbar.css";
import "./boxstyle.css";

function Weekly(props) {
  // // test
  // const click = (item) =>{
  //   window.open("/home","test","width=500,height=600");
  // }
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return(
    <>
    <h5>WEEKLY <img src="/weekly.png"width="30"height="30"/>
    <div className="text-center">
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
    </div>
    </h5>
    <div className="scrollbar" id="style-7">
      <div className="force-overflow-auto">
      <Table bordered>
  <thead>
    <tr className="text-center" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
      <th><img src="/speed.png"width="20"height="20"/></th>
      <th>월요일</th>
      <th>화요일</th>
      <th>수요일</th>
      <th>목요일</th>
      <th>금요일</th>
      <th>토요일</th>
      <th>일요일</th>
    </tr>
  </thead>
  <tbody>
    <tr className="text-center">
      <td style={{height:"400px"}}><WeeklyForm/></td>
      <td style={{width:"150px"}}>
        <div className="banner1">ㅇㅂㅇㅈㅂㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅂㅈㅈㅈㅈㅈㅈ22112ㄹ12ㄹ12ㄹ12ㄹ12ㄹ12ㄹ1ㄹㅈ픚ㅇㅍㅈ우패ㅑㅈㅍ줖ㅈㄷ페ㅐㄷㅈㅍㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊㅊ</div>
      </td>
      <td>
      <div className="banner" style={{weight:"200px", height:"100px", backgroundColor:"#e407e4", color:"white", fontSize:"15px"}}>진료</div>
      <div className="banner" style={{weight:"200px", height:"100px", backgroundColor:"#07e446", color:"white", fontSize:"15px"}}>뿌잉</div>
      </td>
      <td>
      <div className="banner" style={{weight:"200px", height:"200px", backgroundColor:"#9c7bee", color:"white", fontSize:"15px"}}>빠잉</div>  
      </td>
      <td>
      <div className="banner" style={{weight:"200px", height:"100px", backgroundColor:"#65bafa", color:"white", fontSize:"15px"}}>뿌잉</div>
      <div className="banner" style={{weight:"200px", height:"200px", backgroundColor:"#047581", color:"white", fontSize:"15px"}}>빠잉</div>     
      </td>
      <td>
      <div className="banner" style={{weight:"200px", height:"300px", backgroundColor:"#f55f74", color:"white", fontSize:"15px"}}>빠잉</div>  
      </td>
      <td>
      <div className="banner" style={{weight:"200px", height:"300px", backgroundColor:"#76068d", color:"white", fontSize:"15px"}}>빵빵</div>  
      </td>
      <td></td>
    </tr>
  </tbody>
</Table>
</div>
</div>
    </>
  )
}

export default Weekly;