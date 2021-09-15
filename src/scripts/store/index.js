import { createStore } from 'vuex'
import absences from "@/scripts/store/absences";
import incidences from "@/scripts/store/incidences";
import notifications from "@/scripts/store/notifications";
import inbox from "@/scripts/store/inbox";

export default createStore({
    modules: {
        absences,
        incidences,
        notifications,
        inbox
    }
})
