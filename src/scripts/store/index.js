import { createStore } from 'vuex'
import absences from "@/scripts/store/absences";

export default createStore({
    modules: {
        absences
    }
})
