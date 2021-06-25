import { useState } from "react";
import { Carousel } from "react-bootstrap";

function Photo(props){
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return(
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src="/doctor.JPG" with="360" height="280"  className="d-block w-100" alt="First slide"/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/mask.JPG" with="360" height="280" className="d-block w-100" alt="Second slide"/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/mask2.JPG" with="360" height="280" className="d-block w-100" alt="Third slide"/>
      </Carousel.Item>
    </Carousel>
  )
}

export default Photo;