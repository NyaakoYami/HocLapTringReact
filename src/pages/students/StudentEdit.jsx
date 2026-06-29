import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const StudentEdit = () => {
  const [student, setStudent] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`students/${id}`).then((res) => setStudent(res.data));
  }, []);

  const handleChange = (e) => {
    setStudent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`students/${id}`, student).then(() => navigate("/students"));
  };

  return (
    <>
      <h3>Edit student</h3>

      <Form className="col-md-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={student.name || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>GPA:</Form.Label>
          <Form.Control
            type="text"
            name="gpa"
            value={student.gpa || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          <FontAwesomeIcon icon={faSave} /> Update
        </Button>
      </Form>
    </>
  );
};

export default StudentEdit;
