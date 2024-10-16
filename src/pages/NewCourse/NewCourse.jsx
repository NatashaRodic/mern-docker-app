import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as createCourseAPI from '../../utilities/courses-api';

export default function NewCourse() {
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    name: 'Node.js',
    description: 'Test',
    content: "Course content",
    duration: '5',
    skillLevel: '1'
  });

  function handleChange(e) {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createCourseAPI.createNew(newCourse);
      navigate('/courses');
    } catch (err) {
      console.log('Error while creating the course', err);
    }
  }

  return (
    <>
      <h1>New Course</h1>

      <form className="containerBox" onSubmit={handleSubmit}>
        <label>Course Title</label>
        <input type="text" name="name" value={newCourse.name} onChange={handleChange} required />
        <label> Short Description</label>
        <textarea type="description" name="description" rows="5" cols="30" value={newCourse.description} onChange={handleChange}>Course Details</textarea>
        <label>Course Content</label>
        <textarea type="content" name="content" rows="5" cols="30" value={newCourse.content} onChange={handleChange}>Course Details</textarea>
        <label>Course duration (in weeks) </label>
        <input type="duration" name="duration" value={newCourse.duration} onChange={handleChange} />
        <label>Skills level</label>
        <input type="skillLevel" name="skillLevel" value={newCourse.skillLevel} onChange={handleChange} />
        <button>Create the course</button>
      </form>
    </>

  );
}