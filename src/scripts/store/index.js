import { createStore } from 'vuex'
import absences from "@/scripts/store/absences";
import incidences from "@/scripts/store/incidences";
import notifications from "@/scripts/store/notifications";

export default createStore({
    modules: {
        absences,
        incidences,
        notifications
    }
})
