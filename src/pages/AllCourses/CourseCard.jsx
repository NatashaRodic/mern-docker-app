import React, { useEffect, useState } from 'react';
import * as coursesAPI from '../../utilities/courses-api';
import * as applicationsAPI from '../../utilities/applications-api';

function CourseCard({ courseInfo, onDelete, user }) {
    const [applicationInfo, setApplicationInfo] = useState(null);
    console.log(`course info ${courseInfo}`);
    // Constructing the skill level bars based on the skill level of the course
    let levelBars = "";
    for (let index = 0; index < courseInfo.skillLevel; index++) {
        levelBars += " 🟩";
    }

    useEffect(() => {
        async function getApplication() {
            const application = await applicationsAPI.getApplication(courseInfo._id);
            setApplicationInfo(application);
        }
        getApplication();
    }, [courseInfo._id]);

    // Handling the deletion of a course
    const handleDelete = async (e) => {
        e.preventDefault();
        await coursesAPI.deleteCourse(courseInfo._id);
        await onDelete();
    }

    const handleDetailsClick = (courseId) => {
        window.location.href = `/courses/${courseId}/details`;
    };

    const handleApplyClick = (courseId) => {
        window.location.href = `/courses/${courseId}/apply`;
    };

    return (
        <div className='courseCard'>
            <h2>{courseInfo.name}</h2>
            <div className="courseDescription"><p>{courseInfo.description}</p></div>
            <p className='details'>Duration: {courseInfo.duration} weeks</p>
            <p className='details'>Skill level required: {levelBars}</p>

            {/* Conditionally render buttons based on user role */}
            {user.role === "teacher" ? (
                <>
                    <span>
                        <button onClick={() => handleDetailsClick(courseInfo._id)} className='approve-button-color'>Details</button>
                    </span>
                    {courseInfo.createdBy === user.id && (
                        <span>
                            <button onClick={handleDelete} className='delete-button-color'>
                                Delete Course
                            </button>
                        </span>
                    )}
                </>
            ) : (
                <span>
                    {applicationInfo ? (
                        applicationInfo.status === 'approved' ? (
                            <button onClick={() => handleDetailsClick(courseInfo._id)} >Details</button>
                        ) : (
                            <p>Your application is {applicationInfo.status}</p>
                        )
                    ) : (
                        <button onClick={() => handleApplyClick(courseInfo._id)}>Apply</button>
                    )}
                </span>
            )
            }
        </div >
    );
}

export default CourseCard;