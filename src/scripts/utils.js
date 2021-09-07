export default {
    compareDates(a, b) {
        if ( new Date(a.createdAt) > new Date(b.createdAt) ){
            return -1
        }
        if ( new Date(a.createdAt) < new Date(b.createdAt) ){
            return 1
        }
        return 0
    }
}
