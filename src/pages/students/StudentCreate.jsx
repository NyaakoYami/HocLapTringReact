import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentCreate = () => {
  const [student, setStudent] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("students", student).then(() => navigate("/students"));
  };

  return (
    <>
      <h3>Create new student</h3>

      <Form className="col-md-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>GPA:</Form.Label>
          <Form.Control type="text" name="gpa" onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="primary">
          <FontAwesomeIcon icon={faPlus} /> Add
        </Button>
      </Form>
    </>
  );
};

export default StudentCreate;
