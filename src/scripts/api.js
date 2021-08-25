import globalAxios from 'axios';

const API_URL = process.env.VUE_APP_API;

export default {
    getNotifications() {
        return globalAxios.get(`${API_URL}/notifications`);
    }
}
