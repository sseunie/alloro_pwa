import { createStore } from 'vuex'
import absences from "@/scripts/store/absences";
import incidences from "@/scripts/store/incidences";
import notifications from "@/scripts/store/notifications";
import user from "@/scripts/store/user";
import reservations from "@/scripts/store/reservations";
import chat from "@/scripts/store/chat";

export default createStore({
    modules: {
        absences,
        incidences,
        notifications,
        user,
        reservations,
        chat
    }
})
