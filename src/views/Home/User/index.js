function User(props){
  return(
    <>
    <div className="overflow-auto">
      <table className="table table-hover">
        <thead className="card-header" style={{backgroundColor:"rgb(18, 60, 114)", color:"white"}}>
        <tr class="text-center">
          <th scope="col">PHOTO</th>
          <th scope="col">DOCTOR</th>
          <th scope="col">ROOM</th>
          <th scope="col">SEX</th>
        </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <th scope="row"><img src="/doctor1.png" width="30" height="30"/></th>
            <th>김상중</th>
            <th>1</th>
            <th>M</th>
          </tr>
          <tr className="text-center">
            <th scope="row"><img src="/doctor2.png" width="30" height="30"/></th>
            <th>신용권</th>
            <th>2</th>
            <th>M</th>
          </tr>
          <tr className="text-center">
            <th scope="row"><img src="/doctor3.png" width="30" height="30"/></th>
            <th>홍미경</th>
            <th>3</th>
            <th>W</th>
          </tr>
          <tr className="text-center">
            <th scope="row"><img src="/doctor3.png" width="30" height="30"/></th>
            <th>최은지</th>
            <th>4</th>
            <th>W</th>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}

export default User;