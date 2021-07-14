import { useEffect, useState } from "react";
import { Accordion, Alert, Badge, Button, Card, Carousel } from "react-bootstrap";
import { getTestImgs } from "apis/Treatment"

function PackageImgTest(props) {

  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    const test = props.groupTest.tests[0];
    if(test.result != null && test.result === "첨부완료"){
      console.log(test.treatmentid, " ", test.testdataid);
      work(test.treatmentid, test.testdataid);
    } 
  },[])

  const work = async(treatmentid, testdataid) => {
    const response = await getTestImgs(treatmentid, testdataid);
    setImgList(response.data);
  }
  console.log(imgList);
  return (
    <Accordion className="mb-3">
      <Card>
        <Accordion.Toggle as={Alert} variant="dark" className="mb-0" eventKey="0">
        <span style={{fontWeight:"bold"}}>
        {props.groupTest.groupname}&nbsp;&nbsp;</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {props.groupTest.tests.map(test => {
              return (
                <Accordion key={test.testdataid} className="mb-3">
                  <Card border="secondary">
                    <Card.Header>
                      <Accordion.Toggle block as={Button} size="sm" variant="outline-light" eventKey="0">
                        <span style={{fontSize:"14px", fontWeight:"bold", color:"black"}}>{test.testdataname}	&nbsp;&nbsp; {props.groupTest.tests[0].result ==="사진첨부완료" ? <Badge variant="primary">입력완료</Badge> : <Badge variant="danger">미입력</Badge>}
                        </span>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                      {props.groupTest.tests[0].result ==="사진첨부완료" ?
                        <Carousel interval={null} prevIcon={<span className="carousel-control-prev-icon bg-dark"/>} nextIcon={<span className="carousel-control-next-icon bg-dark"/>}>
                          {imgList != null &&
                          imgList.map((img) => {
                            return(
                              <Carousel.Item key={img.imgid}>
                                <img
                                  className="d-block"
                                  src="/xray01.jpg"
                                  alt="First slide"
                                  width="536px"
                                  height="536px"
                                />
                              </Carousel.Item>
                            )
                          })}
                        </Carousel>
                        :
                        "결과 미입력"
                      }
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              );
            })}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default PackageImgTest;