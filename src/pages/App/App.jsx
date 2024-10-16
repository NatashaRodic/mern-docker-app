import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewCourse from '../NewCourse/NewCourse';
import AllCourses from '../AllCourses/AllCourses';
import ApplicationPage from '../ApplicationPage/ApplicationPage';
import ManageApplications from '../ManageApplications/ManageApplications';
import NavBar from '../../components/NavBar/NavBar';
import CourseCardDetails from '../AllCourses/CourseCardDetails';
import MyCourses from '../MyCourses/MyCourses';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/courses" element={<AllCourses user={user} />} />
            <Route path="/courses/my-courses" element={<MyCourses user={user} />} />
            <Route path="/courses/:courseId/details" element={<CourseCardDetails />} />
            <Route path="/*" element={<Navigate to="/courses" />} />
            {user.role === 'teacher' && (
              <>
                <Route path="/courses/new" element={<NewCourse />} />
                <Route path="/manage-applications" element={<ManageApplications />} />
              </>
            )}
            {user.role === 'student' && (
              <>
                <Route path="/courses/:courseId/apply" element={<ApplicationPage />} />
              </>
            )}
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>

  );
}