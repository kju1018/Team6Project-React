import { Carousel } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Redirect, Route, Switch, useHistory } from "react-router";

function Hospital() {
  const [index, setIndex] = useState(0);
  const history = useHistory();
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleLogin = () => {
    history.push('/login');
  }
  
  return (
    <div style={{height:"100vh"}}>
      <div className="pb-2" style={{backgroundColor:"#ffffff"}}><img src="douzone.PNG" className="pl-5" style={{width: "250px"}}/></div>
      <div className="d-flex">
        <div className="col-6">
          <div className="pt-5 pl-5">
            <div className="card" style={{width:"70%", marginLeft:"115px", marginTop:"0px"}}>
              <div className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>System Login</div>
                <div className="card-body">
                <div>
                  <img src="Login-amico.png" width="80%"/>
                </div>
                  <Form>
                    <Form.Group controlId="formBasicID">
                      <Form.Label>Hospital Code</Form.Label>
                      <Form.Control type="text" placeholder="병원코드를 입력하세요" />
                      <Form.Text className="text-muted">
                        If you have forgotten your ID, please contact customer service.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <div className="text-center mt-4">
                      <Button variant="secondary" onClick={handleLogin} >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div>
            <div className="row" style={{width:"70%", marginLeft:"15%", marginTop:"30px"}}>
              <div className="col" style={{height:"300px", border:"1px solid gray"}}>공지사항</div>
            </div>
          </div>
          <div className="pt-5 p-0" style={{width:"90%", marginLeft:"30px"}}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="mainSlide1.png"
                height="360px"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="mainSlide2.png"
                height="360px"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="mainSlide4.png"
                height="360px"
              />
            </Carousel.Item>
          </Carousel>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Hospital;