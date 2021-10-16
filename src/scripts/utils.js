export default {
    compareDates(a, b) {
        if (a.messages && a.messages.length !== 0) a = a.messages[a.messages.length - 1]
        if (b.messages && b.messages.length !== 0) b = b.messages[b.messages.length - 1]

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
        value = value.toLowerCase()
        for (let key in json) {
            if (typeof json[key] === 'object' ) {
                if (this.checkForValue(json[key], value)) return true
            }
            else {
                if (json[key].toString().toLowerCase().includes(value)) return true
            }
        }
        return false
    },

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },

    addTimeDuration(string, duration) {
        const dHours = Math.trunc(duration/60)
        const dMin = duration % 60

        const initial = string.split(':')
        const hours = parseInt(initial[0]) + dHours
        const minutes = parseInt(initial[1]) + dMin

        if (minutes === 60) {
            return `${hours+1}:00`
        }
        return `${hours}:${this.formatToTwoDigits(minutes)}`
    },

    countOccurrences(array) {
        return array.reduce((obj, item) => {
            obj[item] = (obj[item] || 0) + 1
            return obj
        }, {})
    },

    getDateFrom(date) {
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${date.getFullYear()}-${this.formatToTwoDigits(month)}-${this.formatToTwoDigits(day)}`
    },
}
