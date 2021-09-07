import { createStore } from 'vuex'
import absences from "@/scripts/store/absences";
import incidences from "@/scripts/store/incidences";

export default createStore({
    modules: {
        absences,
        incidences
    }
})
