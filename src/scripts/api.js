import globalAxios from 'axios';

const API_URL = process.env.VUE_APP_API;

export default {
    getNotifications() {
        return globalAxios.get(`${API_URL}/notifications`);
    },

    getUser(id) {
        return globalAxios.get(`${API_URL}/users/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
    },

    login(username, password) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        return globalAxios.post(`${API_URL}/login`, params);
    }
}
