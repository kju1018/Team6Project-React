let lastBno = 3;

let data = [];
for(var i=1; i<=lastBno; i++) {
  data.push({
    bno:i, 
    btitle:"제목"+i, 
    bcontent:"새로운 기능이 추가 되었습니다.", 
    bwriter:"관리자", 
    bdate:new Date().toLocaleDateString(), 
    bhitcount:0
  });
}


export function getBoardList() {
  return data;
}

export function getBoard(bno) {
  const newBoard = data.find(board => {
    return board.bno === bno
  });
  return newBoard;
}