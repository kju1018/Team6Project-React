import { Carousel, Pagination } from "react-bootstrap";
import React, { useEffect, useState } from "react";
//현재 DayIndex 구하기
const CalcDayIndex =(month) =>{
    let today = new Date().getDate();
    
    const DayIndex = (today%7) -1
    return DayIndex;
}

// 달에 따른 슬라이드 배열 넣기
const CalcCitem = (month) =>{ 
    let lastDay = null;
    // 해당 달의 마지막 날
    lastDay = new Date(2021,month,0).getDate();
    
    let ItemBoard =[];
    // 마지막 슬라이드를 제외하고 각 슬라이드의 배열에 들어갈 숫자넣기 
    for(var i=1; i<=4; i++){
        let Item = [];
        for(var j=7*(i-1)+1; j<=7*i; j++){
            Item.push(j);
        }
        ItemBoard.push(Item)
    }
    let Item = [];
    // 마지막 슬라이드에 넣을것(해당 달의 마지막날 까지 배열에 추가)
    for(var j=29; j<=lastDay; j++){
        Item.push(j)
    }
    // 해당 슬라이드에 아무것도 없을때 슬라이드 안나오게
    if(Item.length>0)
    ItemBoard.push(Item);
    return ItemBoard;
}
function Calendar(props){
    // 현재 달 상태
    const [month,setMonth] = useState(new Date().getMonth()+1)
    // 현재 day index 상태
    const [dayIndex, setDayIndex] = useState(()=>(CalcDayIndex(new Date().getMonth()+1)))
    // 현재 슬라이드 인덱스
    const [slideIndex, setSlideIndex] = useState(0);
    // 현재 슬라이드 배열
    const [CItem, setCItem] = useState(()=>(CalcCitem(month)));

    //일자 선택 함수
    const onChangeDaySelect =(index,e) =>{
        setDayIndex(index);
      
    }
    // 최종 결과 date set하는곳
    useEffect(()=>{
        const day = CItem[slideIndex][dayIndex];
        const selectDate = new Date(new Date().getFullYear()+"-"+month+"-"+day)
        props.setSelectDate(selectDate.toLocaleDateString()) 

    },[dayIndex,slideIndex,month])

    // 현재 슬라이드 이동 함수
  const handleSelect = (selectedIndex,e) => {
    setSlideIndex(selectedIndex);
  };

  //현재 날짜의 슬라이드로 이동 초기화
  useEffect(()=>{
    const today = new Date().getDate()
    setSlideIndex(parseInt(today/7));
  },[])

  //달이 바뀔때 해당 달의 날짜배열 상태 변경
  useEffect(()=>{
   setCItem(CalcCitem(month)); 
  },[month])

  //날짜에 따른 요일 매핑
  var week = ['일', '월', '화', '수', '목', '금', '토']; 

  // 달 바꾸기(버튼에 따른 달 숫자 변경)
    const ChangeMonth = (dir) =>{
        let newMonth = month;
        if(dir && newMonth<12){
            newMonth++
            setMonth(newMonth)
        }else if(!dir && newMonth>1){
            newMonth-- 
            setMonth(newMonth)
        }
    }


    return(
        <div className="container">
            <div className="d-flex flex-row" style={{margin:"10px 0px"}}>
                <button className="carousel-control-prev-icon bg-info" style={{border:"none"}} onClick={()=>{ChangeMonth(false)}}/>
                <label style={{fontWeight:"bold", margin:"0px 10px"}}>{month}월</label>
                <button className="carousel-control-next-icon  bg-info "style={{border:"none"}} onClick={()=>{ChangeMonth(true)}}/>
            </div>
            <Carousel interval={null}  variant="dark"  prevIcon = {<span className="carousel-control-prev-icon bg-info" />} nextIcon={<span className="carousel-control-next-icon  bg-info " />} indicators={false} activeIndex={slideIndex} onSelect={handleSelect}>
                {
                    CItem.map((citem,index)=>{
                        return(
                            <Carousel.Item key={index}>
                                    <div  className={index<4?"row d-flex justify-content-between":"row d-flex"}  style={{padding:"0px 130px"}}>
                                
                                 {citem.map((day,index)=>{return(
                                       <button key={index} onClick={()=>{onChangeDaySelect(index)}} style={{backgroundColor:dayIndex!==index?"white":"#F6FCFA",border:dayIndex!==index?"none":"2px solid skyblue", borderRadius:"15px",marginLeft:"5px", width:"50px", textAlign:"center"}}>
                                        {day}<br/>
                                       {week[new Date(new Date().getFullYear()+"-"+month+"-"+day).getDay()]}
                                        </button>       
                                )
                                })}
                               </div>
                            </Carousel.Item>
                        )
                    })
                }
 
            </Carousel>
            
        </div>

        
            
    )
}

export default Calendar;