export function startTests(checkedList) {
  for(let i = 0; i < checkedList.length; i++){
    for(let j  = 0 ; j < checkedList[i].tests.length; j++){
      let newTest = tests.find((test) => {
        return checkedList[i].tests[j].testdataid === test.testdataid;
      })
      newTest.state = "진행중";
    }
  }
  console.log(tests)
}
