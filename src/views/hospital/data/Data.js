let lastBno = 3;

let data = [
  {
    bno:4, 
    btitle:"Ver. 1.1.5", 
    bcontent:"직원등록 기능이 추가 되었습니다.", 
    bwriter:"관리자", 
    bdate:"2021-06-30", 
    bhitcount:15
  },
  {
    bno:3, 
    btitle:"Ver. 1.1.4", 
    bcontent:"실시간 기능이 추가 되었습니다.", 
    bwriter:"관리자", 
    bdate:"2021-06-20", 
    bhitcount:18
  },

  {
    bno:2, 
    btitle:"Ver. 1.1.3", 
    bcontent:"사진추가 기능이 추가 되었습니다.", 
    bwriter:"관리자", 
    bdate:"2021-06-12", 
    bhitcount:15
  },


  {
    bno:1, 
    btitle:"Ver. 1.1.2", 
    bcontent:"채팅 기능이 추가 되었습니다.", 
    bwriter:"관리자", 
    bdate:"2021-05-20", 
    bhitcount:12
  },

];


export function getBoardList() {
  return data;
}

export function getBoard(bno) {
  const newBoard = data.find(board => {
    return board.bno === bno
  });
  return newBoard;
}