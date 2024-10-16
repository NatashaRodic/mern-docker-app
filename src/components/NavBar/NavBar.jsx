import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (

    <>
      <nav>

        <div className="left">
          {user.role === 'student' && (
            <>
              <Link to="/courses">All Courses</Link>
              <Link to="/courses/my-courses">My Courses</Link>
            </>
          )}

          {user.role === 'teacher' && (
            <>
              <Link to="/courses">All Courses</Link>
              <Link to="/courses/my-courses">My Courses</Link>
              <Link to="/courses/new">New Course</Link>
              <Link to="/manage-applications">Manage Applications</Link>
            </>
          )}


        </div>
        <div className="right">

          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </div>
      </nav>

      <div className='welcome'>Welcome,<strong> {user.role}</strong> <strong> {user.name}</strong></div>
    </>

  );
}