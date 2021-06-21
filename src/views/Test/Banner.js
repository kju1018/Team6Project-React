import { Carousel } from "react-bootstrap";

function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="banner.png"
          alt="First slide"
          height="200px"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="process.png"
          alt="Second slide"
          height="200px"
        />
      </Carousel.Item>
    </Carousel>
  );
}
export default Banner;