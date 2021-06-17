import { Carousel } from "react-bootstrap";
import React, { useEffect, useState } from "react";



const InitCitem = (month) =>{ 
    let lastDay = null;
    lastDay = new Date(2021,month,0).getDate();
  
    let ItemBoard =[];
    for(var i=1; i<=4; i++){
        let Item = [];
        for(var j=7*(i-1)+1; j<=7*i; j++){
            Item.push(j);
        }
        ItemBoard.push(Item)
    }
    let Item = [];
    for(var j=29; j<=lastDay; j++){
        Item.push(j)
    }
    if(Item.length>0)
    ItemBoard.push(Item);
    return ItemBoard;
}
function Calendar(props){
    const [index, setIndex] = useState(0);
    const [CItem, setCItem] = useState(()=>(InitCitem(props.month)));
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(()=>{
      console.log(CItem);
  },[CItem])
  var week = ['일', '월', '화', '수', '목', '금', '토']; 
    var dayOfWeek = week[new Date("2021-6-16").getDay()];

    return(
 
        <div className="container">

            <Carousel   variant="dark" prevIcon = {<span className="carousel-control-prev-icon bg-dark" />} nextIcon={<span className="carousel-control-next-icon bg-dark" />} indicators={false} activeIndex={index} onSelect={handleSelect}>
                {
                    CItem.map((citem,index)=>{
                        return(
                            <Carousel.Item>
                                    <div className={index<4?"row d-flex justify-content-between":"row d-flex"}  style={{padding:"0px 55px"}}>
                                
                                 {citem.map((day)=>{return(
                                       <div className="border " style={{borderRadius:"15px",marginRight:"20px", width:"30px", textAlign:"center"}}>
                                       {day}<br/>
                                       {week[new Date("2021-"+props.month+"-"+day).getDay()]}
                                        </div>  
                                        
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