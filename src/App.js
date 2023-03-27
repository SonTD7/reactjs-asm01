import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const urlStaffs =
  "http://localhost:8080/staffs?fbclid=IwAR3CBsYwQWXxZO4t9pNyN6SOWvOTR_4yfuTSVkpDZV_qoECYvZn_w-rulFo";
const urlDepartments = "http://localhost:8080/departments";

function App() {
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const [value, setValue] = useState(0);
  const [departments, setDepartments] = useState([]);

  const fetchStaffs = async () => {
    const response = await fetch(urlStaffs);
    const newStaffs = await response.json();
    setStaffs(newStaffs);
    setLoading(false);
  };

  const fetchDepartments = async () => {
    const response = await fetch(urlDepartments);
    const newDepartments = await response.json();
    setDepartments(newDepartments);
  };

  useEffect(() => {
    fetchStaffs();
    fetchDepartments();
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
  const departmentName = departments.find(
    (dept) => dept.id === departmentId
  )?.name;
  return (
    <section className="section">
      <div className="title">
        <h2>Ứng dụng quản lý nhân sự v.0.1</h2>
        <div className="underline"></div>
      </div>
      <div className="staffs-container">
        <div className="staffs-btn-container">
          {staffs.map((staff, index) => (
            <button
              key={staff.id}
              className={`staffs-btn ${index === value && "active-btn"}`}
              onClick={() => setValue(index)}
            >
              {staff.name}
            </button>
          ))}
        </div>
        <article className="staffs-info">
          <h3>Họ và Tên: {name}</h3>
          <p>Ngày sinh: {format(new Date(doB), "do MMMM Y  H:m:s")}</p>
          <p>Ngày vào công ty: {format(new Date(startDate), "do MMMM Y  H:m:s")}</p>
          <p>Phòng ban: {departmentName}</p>
          <p>Số ngày nghỉ còn lại: {annualLeave}</p>
          <p>Số ngày làm thêm: {overTime}</p>
        </article>
      </div>
    </section>
  );
}

export default App;