import React, { useEffect, useState } from 'react';
import * as applicationsAPI from '../../utilities/applications-api';

export default function ManageApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        async function fetchPendingApplications() {
            const pendingApplications = await applicationsAPI.getPendingApplications();
            setApplications(pendingApplications);
        }
        fetchPendingApplications();
    }, []);

    const handleApprove = async (applicationId) => {
        await applicationsAPI.approveApplication(applicationId);
        setApplications(applications.filter(app => app._id !== applicationId));
    };

    const handleDeny = async (applicationId) => {
        await applicationsAPI.denyApplication(applicationId);
        setApplications(applications.filter(app => app._id !== applicationId));
    };

    return (
        <div className='courseCard'>
            <h1>Manage Applications</h1>
            {applications.length === 0 ? (
                <p>No pending applications.</p>
            ) : (
                <ul>
                    {applications.map(app => (
                        <li key={app._id}>
                            <p><strong>Course:</strong> {app.course.name}</p>
                            <p><strong>Applicant:</strong> {app.user.name}</p>
                            <p><strong>Personal Statement:</strong> {app.personalStatement}</p>
                            <p><strong>Commitment per Week:</strong> {app.commitPerWeek} hours</p>
                            <button onClick={() => handleApprove(app._id)}>Approve</button>
                            <button onClick={() => handleDeny(app._id)}>Deny</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}