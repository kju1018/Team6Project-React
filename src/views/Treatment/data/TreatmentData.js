let lastbno = 20;

let data = [];

let date = new Date();
date.setDate(date.getDate()-1);

for(var i=1; i<=lastBno; i++) {
  data.push({
    treatmentid:i, 
    memo:"제목"+i, 
    bcontent:"내용"+i, 
    bwriter:"user1", 
    bdate:new Date().toLocaleDateString(), 
    bhitcount:0
  });
}