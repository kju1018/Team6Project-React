let lastbno = 10;

let data = [];

for(var i=0; i<=lastbno; i++){
  data.push({
    noticeid:i,
    title:"제목",
    content: "내용",
    userid: "작성자",
    date: new Date().toLocaleDateString(),
  });
}

export function getBoardList() {
  return data;
}

export function getBoard(noticeid) {
  const newBoard = data.find(board => {
    return board.noticeid === noticeid
  });
  return newBoard;
}

