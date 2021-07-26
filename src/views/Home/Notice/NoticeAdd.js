import { noticeUpdate } from "apis/Main";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function NoticeAdd(props) {

  const globalUserid = useSelector((state) => {
    return state.authReducer.userid;
  });//리덕스에 있는 userid 사용
  console.log(globalUserid);

  const [board, setBoard] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    setBoard({
      ...board,
      [event.target.name]: event.target.value //이벤트 받아오기
    });
  };

  const handleAdd = async(event) => {
    event.preventDefault(); //form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게
    const newBoard = {...board};
    newBoard.userid = globalUserid;
    newBoard.date = new Date();
    await noticeUpdate(newBoard);
    setBoard({title: "", content: ""});
    props.handleClose1();
    props.work();
    alert('공지사항을 등록 하였습니다!');
  };

  return(
    <>
    <Modal show={props.show} onHide={props.handleClose1}>
              <Form className="text-center" onSubmit={handleAdd}> 
                <h4>NOTICE<img src="/pencil.png"width="25"height="25"/></h4>
                <hr></hr>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label><strong>제목</strong></Form.Label>
                  <Form.Control type="text" name="title" value={board.title} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label><strong>내용</strong></Form.Label>
                  <Form.Control as="textarea" rows={3} name="content" value={board.content} onChange={handleChange}/>
                </Form.Group>
              </Form>
              <Modal.Footer>
              <Button type="submit" variant="primary" onClick={handleAdd}>
                  ADD
                </Button>
                <Button variant="danger" onClick={props.handleClose1}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </Modal>
    </>
  )
}

export default NoticeAdd;