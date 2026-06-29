import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StudentDetails = () => {
  const [student, setStudent] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios.get(`students/${id}`).then((res) => setStudent(res.data));
  }, []);

  return (
    <>
      <h3>Student Details</h3>

      <dl>
        <dt>ID:</dt>
        <dd>{student.id}</dd>
        <dt>Name:</dt>
        <dd>{student.name}</dd>
        <dt>GPA:</dt>
        <dd>{student.gpa}</dd>
      </dl>

      <Link to="/students">Back to list</Link>
    </>
  );
};

export default StudentDetails;
