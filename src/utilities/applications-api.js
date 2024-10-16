import sendRequest from "./send-request";
const BASE_URL = '/api/applications';

export async function submitApplication(applicationData) {
    return sendRequest(BASE_URL, 'POST', applicationData);
}

export async function getApplication(courseId) {
    return sendRequest(`${BASE_URL}/${courseId}`);
}

export async function getPendingApplications() {
    return sendRequest(`${BASE_URL}/pending`);
}

export async function approveApplication(applicationId) {
    return sendRequest(`${BASE_URL}/${applicationId}/approve`, 'PUT');
}

export async function denyApplication(applicationId) {
    return sendRequest(`${BASE_URL}/${applicationId}/deny`, 'PUT');
}

export async function getApplicationsByUser(userId) {
    return sendRequest(`${BASE_URL}/user/${userId}`);
}