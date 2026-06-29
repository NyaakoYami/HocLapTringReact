import {
  faEye,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("students").then((res) => setStudents(res.data));
  }, []);

  const handleDelete = ({ id, name }) => {
    if (confirm(`Are you sure you want to delete student ${name}?`)) {
      axios.delete(`students/${id}`).then(() => {
        setStudents((prev) => [...prev.filter((s) => s.id != id)]);
      });
    }
  };

  return (
    <>
      <h3>Student List</h3>

      <Link to="create" className="btn btn-success mb-2">
        <FontAwesomeIcon icon={faPlus} />
        Add new
      </Link>

      <table className="table table-light table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.gpa}</td>
              <td>
                <Link to={s.id} className="btn btn-outline-info btn-sm me-1">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link
                  to={`${s.id}/edit`}
                  className="btn btn-outline-warning btn-sm me-1"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(s)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentList;
