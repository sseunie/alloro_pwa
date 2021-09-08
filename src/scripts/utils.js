export default {
    compareDates(a, b) {
        if ( new Date(a.createdAt) > new Date(b.createdAt) ){
            return -1
        }
        if ( new Date(a.createdAt) < new Date(b.createdAt) ){
            return 1
        }
        return 0
    },

    formatDate(givenDate) {
        const fullDate = new Date(givenDate)
        const currentDate = new Date()
        const diffDays = currentDate.getDate() - fullDate.getDate()
        const diffMonths = currentDate.getMonth() - fullDate.getMonth()
        const diffYears = currentDate.getFullYear() - fullDate.getFullYear()

        const day = fullDate.getDate() < 10 ? `0${fullDate.getDate()}` : fullDate.getDate()
        const month = fullDate.getMonth() < 9 ? `0${fullDate.getMonth()+1}` : fullDate.getMonth() + 1

        if (diffDays === 0 && diffMonths === 0 && diffYears === 0) {
            return `${fullDate.getHours()}:${fullDate.getMinutes()}`
        } else if (diffDays === 1 && diffMonths === 0 && diffYears === 0) {
            return 'Ayer'
        } else if (diffYears === 0) {
            return `${day}/${month}`
        } else {
            return `${day}/${month}/${fullDate.getFullYear()}`
        }
    }
}
