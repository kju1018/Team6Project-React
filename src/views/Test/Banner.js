import { Carousel } from "react-bootstrap";

function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/1.png"
          alt="Second slide"
          height="210px"
          border="1px solid gray"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/process.png"
          alt="Second slide"
          height="210px"
          border="1px solid gray"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/2.png"
          alt="First slide"
          height="210px"
          border="1px solid gray"
        />
      </Carousel.Item>
    </Carousel>
  );
}
export default Banner;