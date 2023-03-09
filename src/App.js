import React, { useState, useEffect } from "react";
import { format } from 'date-fns'
const urlStaffs =
  "http://localhost:8080/staffs?fbclid=IwAR3CBsYwQWXxZO4t9pNyN6SOWvOTR_4yfuTSVkpDZV_qoECYvZn_w-rulFo";

  const urlDepartments ="http://localhost:8080/departments"
function App() {
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchStaffs = async () => {
    const reponse = await fetch(urlStaffs);
    const newStaffs = await reponse.json();
    setStaffs(newStaffs);


    setStaffs(newStaffs);

    setLoading(false);
  };
  useEffect(() => {
    fetchStaffs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  const { name, doB, startDate, departmentId, annualLeave, overTime } =
    staffs[value];
  return (
    <section className="section">
      <div className="title">
        <h2> Ứng dụng quản lý nhân sự v.0.1 </h2>
        <div className="underline"></div>
      </div>
      <div className="staffs-name">
        {/* btn container */}
        <div className="btn-container">
          {staffs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`staffs-btn ${index === value && "active-btn"}`}
              >
                {item.name}
              </button>
            );
          })}
          
          <article className="staffs-info">
            <h3> Họ Và Tên: {name}</h3>
            <p>Ngày sinh: {format(new Date(doB), 'do MMMM Y  H:m:s')}</p>
            <p>Ngày vào công ty: {format(new Date(startDate), 'do MMMM Y  H:m:s')}</p>
            <p>Phòng ban: {departmentId}</p>
            <p>Số ngày nghỉ còn lại: {annualLeave}</p>
            <p>Số ngày làm thêm: {overTime}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default App;
