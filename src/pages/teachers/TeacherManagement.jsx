import {
  faCheck,
  faEye,
  faPen,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const TeacherManagement = () => {
  // States:
  //// teachers: List of teachers
  const [teachers, setTeachers] = useState([]);

  //// teacher: Selected teacher
  const [teacher, setTeacher] = useState({});

  //// showDetailModal: Visibility of details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  //// showCreateModal: Visibility of create modal
  const [showCreateModal, setShowCreateModal] = useState(false);

  //// showDeleteModal: Visibility of delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axios.get("teachers").then((res) => setTeachers(res.data));
  }, []);

  // Events
  //// handleChange: Handle input changes
  const handleChange = (e) => {
    setTeacher((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //// handleClose: Close every modals and reset teacher state
  const handleClose = () => {
    setShowCreateModal(false);
    setShowDetailsModal(false);
    setShowDeleteModal(false);
    setTeacher({});
  };

  //// handleClick: Handle clicking Add/Save changes button
  const handleClick = (e) => {
    if (teacher.id) {
      axios
        .put(`teachers/${teacher.id}`, teacher)
        .then((res) =>
          setTeachers((prev) => [
            ...prev.map((t) => (t.id == teacher.id ? teacher : t)),
          ]),
        );
    } else {
      axios
        .post("teachers", teacher)
        .then((res) => setTeachers((prev) => [...prev, res.data]));
    }
    handleClose();
  };

  //// handleDelete: Handle clicking Yes for delete confirmation
  const handleDelete = () => {
    axios.delete(`teachers/${teacher.id}`).then((res) => {
      setTeachers((prev) => [...prev.filter((t) => t.id != teacher.id)]);
      handleClose();
    });
  };

  return (
    <>
      <h3>Teacher Management</h3>

      <Button
        variant="success"
        className="mb-2"
        onClick={() => setShowCreateModal(true)}
      >
        <FontAwesomeIcon icon={faPlus} /> Add new
      </Button>

      <Table striped>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.salary}</td>
              <td>
                {/* Details Button */}
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-1"
                  onClick={() => {
                    setTeacher(t);
                    setShowDetailsModal(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>

                {/* Edit Button */}
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-1"
                  onClick={() => {
                    setTeacher(t);
                    setShowCreateModal(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </Button>

                {/* Delete Button */}
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-1"
                  onClick={() => {
                    setTeacher(t);
                    setShowDeleteModal(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Details */}
      <Modal show={showDetailsModal} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Teacher Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <dl>
            <dt>Name:</dt>
            <dd>{teacher.name}</dd>

            <dt>Salary:</dt>
            <dd>{teacher.salary}</dd>
          </dl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Create/Edit */}
      <Modal show={showCreateModal} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {teacher.id ? "Edit teacher" : "Add new teacher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={teacher.name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary:</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={teacher.salary || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            {teacher.id ? (
              <>
                <FontAwesomeIcon icon={faSave} /> Save changes
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} /> Add
              </>
            )}
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete teacher {teacher.name} (ID:{" "}
          {teacher.id})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faCheck} /> Yes
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TeacherManagement;
