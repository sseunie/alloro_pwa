export default {
    compareDates(a, b) {
        if (a.messages && a.messages.length !== 0) a = a.messages.at(-1)
        if (b.messages && b.messages.length !== 0) b = b.messages.at(-1)

        if ( new Date(a.created_at) > new Date(b.created_at) ){
            return -1
        }
        if ( new Date(a.created_at) < new Date(b.created_at) ){
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

        const day = this.formatToTwoDigits(fullDate.getDate())
        const month = this.formatToTwoDigits(fullDate.getMonth() + 1)


        if (diffDays === 0 && diffMonths === 0 && diffYears === 0) {
            return this.getTime(fullDate)
        } else if (diffDays === 1 && diffMonths === 0 && diffYears === 0) {
            return 'Ayer'
        } else if (diffYears === 0) {
            return `${day}/${month}`
        } else {
            return `${day}/${month}/${fullDate.getFullYear()}`
        }
    },

    formatDateTime(givenDate) {
        const formattedDate = this.formatDate(givenDate)
        if (formattedDate.includes(':')) {
            return formattedDate
        } else {
            return `${formattedDate} ${this.getTime(new Date(givenDate))}`
        }
    },

    formatToTwoDigits(number) {
        return number < 10 ? `0${number}` : number
    },

    getTime(date) {
        const hours = this.formatToTwoDigits(date.getHours())
        const minutes = this.formatToTwoDigits(date.getMinutes())
        return `${hours}:${minutes}`
    },

    checkForValue(json, value) {
        for (let key in json) {
            if (json[key].toString().includes(value)) {
                return true
            }
        }
        return false
    }
}
