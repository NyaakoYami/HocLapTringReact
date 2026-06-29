import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutHome from "./layouts/LayoutHome";

import StudentList from "./pages/students/StudentList";
import StudentDetails from "./pages/students/StudentDetails";
import StudentCreate from "./pages/students/StudentCreate";
import StudentEdit from "./pages/students/StudentEdit";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import TeacherManagement from "./pages/teachers/TeacherManagement";

axios.defaults.baseURL = "http://localhost:3000/";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutHome />}>
            <Route path="students">
              <Route index element={<StudentList />} />
              <Route path=":id" element={<StudentDetails />} />
              <Route path="create" element={<StudentCreate />} />
              <Route path=":id/edit" element={<StudentEdit />} />
            </Route>

            <Route path="teachers" element={<TeacherManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
