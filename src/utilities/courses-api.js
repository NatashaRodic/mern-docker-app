import sendRequest from './send-request';
const BASE_URL = '/api/courses';

export async function getAll() {
    return sendRequest(BASE_URL);
}

export async function getById(courseId) {
    return sendRequest(`${BASE_URL}/${courseId}`);
}

export async function getDetails(courseId) {
    return sendRequest(`${BASE_URL}/${courseId}/details`);
}

export async function createNew(newCourse) {
    return sendRequest(BASE_URL, 'POST', newCourse);
}

export async function deleteCourse(courseId) {
    return sendRequest(`${BASE_URL}/${courseId}`, 'DELETE');
}