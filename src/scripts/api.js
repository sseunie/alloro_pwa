import globalAxios from 'axios';

const API_URL = process.env.VUE_APP_API;

export default {
    getNotifications() {
        return globalAxios.get(`${API_URL}/notifications`);
    },

    getUser(id) {
        return globalAxios.get(`${API_URL}/users/${id}`, config());
    },

    updateUser(id, data) {
        return globalAxios.patch(`${API_URL}/users/${id}`, data, config())
    },

    login(username, password) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        return globalAxios.post(`${API_URL}/login`, params);
    },

    getResidences() {
        return globalAxios.get(`${API_URL}/residences`);
    },

    getIncidenceAreas() {
        return globalAxios.get(`${API_URL}/incidenceAreas`);
    },

    createIncidence(data) {
        return globalAxios.post(`${API_URL}/incidences`, data, config())
    },

    createAbsence(data) {
        return globalAxios.post(`${API_URL}/absences`, data, config())
    },

    getAbsences() {
        return globalAxios.get(`${API_URL}/absences?userId=${localStorage.getItem('userid')}`, config())
    },

    getIncidences() {
        return globalAxios.get(`${API_URL}/incidences?userId=${localStorage.getItem('userid')}`, config())
    },

    updateIncidenceReadStatus(id) {
        return globalAxios.patch(`${API_URL}/incidences/${id}`, { read: true }, config())
    },

    getInbox() {
        return globalAxios.get(`${API_URL}/users/${localStorage.getItem('userid')}/inbox`)
    },

    // path should be /users/:id/inbox, but json-server does not allow a patch on that path
    updateIncidencesFromInbox(incidences) {
        return globalAxios.patch(`${API_URL}/inbox/${localStorage.getItem('userid')}`, { incidences }, config())
    },

    // path should be /users/:id/inbox, but json-server does not allow a patch on that path
    updateNotificationsFromInbox(notifications) {
        return globalAxios.patch(`${API_URL}/inbox/${localStorage.getItem('userid')}`, { notifications }, config())
    }
}

function config() {
    return {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    };
}
