import { createStore } from 'vuex'
import absences from "@/scripts/store/absences";
import incidences from "@/scripts/store/incidences";
import notifications from "@/scripts/store/notifications";
import inbox from "@/scripts/store/inbox";
import user from "@/scripts/store/user";
import reservations from "@/scripts/store/reservations";

export default createStore({
    modules: {
        absences,
        incidences,
        notifications,
        inbox,
        user,
        reservations
    }
})
