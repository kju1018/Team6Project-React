import { useEffect, useState } from "react";
import { Accordion, Alert, Badge, Button, Card, Carousel } from "react-bootstrap";
import { getTestImgs } from "apis/Treatment"
import ImgDetailModal from "./ImgDetailModal";

function PackageImgTest(props) {

  const [imgList, setImgList] = useState([]);
  const [selectedImg, setSelectedImg] = useState({});
  const [imgShow, setImgShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const test = props.groupTest.tests[0];
    if(test.result != null && test.result === "첨부완료"){
      work(test.treatmentid, test.testdataid);
    } 
  },[props.groupTest])

  const work = async(treatmentid, testdataid) => {
    try {
      setLoading(true);
      const response = await getTestImgs(treatmentid, testdataid);
      setImgList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
   
  }

  const showImgModal = (img) => {
    setSelectedImg(img);
    setImgShow(true);
  }

  const closeImgModal = () => {
    setSelectedImg({});
    setImgShow(false)

  };
  return (
    <>
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
                  <Accordion key={test.testdataid} className="mb-3" defaultActiveKey={"0"}>
                    <Card border="secondary">
                      <Card.Header>
                        <Accordion.Toggle block as={Button} size="sm" variant="outline-light" eventKey="0">
                          <span style={{fontSize:"14px", fontWeight:"bold", color:"black"}}>{test.testdataname}	&nbsp;&nbsp; {props.groupTest.tests[0].result ==="첨부완료" ? <Badge variant="primary">입력완료</Badge> : <Badge variant="danger">미입력</Badge>}
                          </span>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        {props.groupTest.tests[0].result ==="첨부완료" ?
                          <Carousel interval={null} prevIcon={<span className="carousel-control-prev-icon bg-dark"/>} nextIcon={<span className="carousel-control-next-icon bg-dark"/>}>
                            {
                            loading ===true ? 
                            <div className="d-flex h-100 justify-content-center align-items-center">
                              <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                            :
                            imgList != null &&
                            imgList.map((img) => {
                              return(
                                <Carousel.Item key={img.imgid}>
                                  <img
                                    className="d-block"
                                    src={`http://kosa3.iptime.org:50006/treatment/imgdownload/${img.imgid}`}
                                    width="100%"
                                    height="536px"
                                    onClick={() => { showImgModal(img) }}
                                    style={{cursor:"pointer"}}
                                    alt="xray"
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
      <ImgDetailModal show={imgShow} closeImgModal={closeImgModal} selectedImg={selectedImg}></ImgDetailModal>
    </>
  );
}

export default PackageImgTest;