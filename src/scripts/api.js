import axios from 'axios';

const API_URL = process.env.VUE_APP_API;

export default {
    getNotifications() {
        return axios.get(`${API_URL}/notifications`);
    },

    getUser(id) {
        return axios.get(`${API_URL}/users/${id}`, config());
    },

    login(email, password) {
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);
        return axios.post(`${API_URL}/login`, params);
    },

    getResidences() {
        return axios.get(`${API_URL}/residences`);
    },

    getIncidenceAreas() {
        return axios.get(`${API_URL}/incidenceAreas`);
    },

    createIncidence(data) {
        let formData = new FormData()
        for (let key in data) {
            if (key !== 'images') formData.append(key, data[key])
        }
        for (let key in data.images) {
            formData.append('images[]', data.images[key])
        }
        return axios.post(`${API_URL}/incidences`, formData, config())
    },

    createAbsence(data) {
        return axios.post(`${API_URL}/absences`, data, config())
    },

    getAbsences() {
        return axios.get(`${API_URL}/absences?userId=${localStorage.getItem('userid')}`, config())
    },

    getIncidences() {
        return axios.get(`${API_URL}/incidences?userId=${localStorage.getItem('userid')}`, config())
    },

    getIncidence(id) {
        return axios.get(`${API_URL}/incidences/${id}`, config())
    },

    updateIncidenceReadStatus(id) {
        return axios.patch(`${API_URL}/incidences/${id}`, {}, config())
    },

    getInbox() {
        return axios.get(`${API_URL}/users/${localStorage.getItem('userid')}/inbox`)
    },

    // path should be /users/:id/inbox, but json-server does not allow a patch on that path
    updateIncidencesFromInbox(incidences) {
        return axios.patch(`${API_URL}/inbox/${localStorage.getItem('userid')}`, { incidences }, config())
    },

    // path should be /users/:id/inbox, but json-server does not allow a patch on that path
    updateNotificationsFromInbox(notifications) {
        return axios.patch(`${API_URL}/inbox/${localStorage.getItem('userid')}`, { notifications }, config())
    }
}

function config() {
    return {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    };
}
