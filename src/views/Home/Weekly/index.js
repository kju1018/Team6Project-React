import { forwardRef, useState } from "react";
import { Table } from "react-bootstrap";
import WeeklyForm from "./WeeklyForm";

function Weekly(props) {
  // // test
  // const click = (item) =>{
  //   window.open("/home","test","width=500,height=600");
  // }
  return(
    <>
    <h5>WEEKLY <img src="/weekly.png"width="30"height="30"/></h5>
      <Table striped bordered hover>
  <thead>
    <tr className="text-center">
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
      <td ><WeeklyForm/></td>
    </tr>
    <tr className="text-center">
      <td rowSpan="7"><WeeklyForm/></td>
    </tr>
    <tr className="text-center">
      <td rowSpan="6"><WeeklyForm/></td>
    </tr>
    <tr className="text-center">
     <td rowSpan="5"><WeeklyForm/></td>
    </tr>
    <tr className="text-center">
      <td rowSpan="7"><WeeklyForm/></td>
    </tr>
    <tr className="text-center">
     <td rowSpan="6"><WeeklyForm/></td>
    </tr>
    <tr className="text-center">
     <td rowSpan="5"><WeeklyForm/></td>
    </tr>

    <td rowSpan="4"><WeeklyForm/></td>
  </tbody>
</Table>
    </>
  )
}

export default Weekly;