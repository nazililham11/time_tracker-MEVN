export const numberPad = (num, size) => {
    num = num.toString()
    while (num.length < size) num = "0" + num
    return num
}

export const toDateLocaleString = (date) => {
    date = new Date(date)
    var string = `${date.getFullYear()}-${numberPad(date.getMonth()+1, 2)}-${numberPad(date.getDate(), 2)}T`
    string += `${numberPad(date.getHours(), 2)}:${numberPad(date.getMinutes(), 2)}`
    return string
}

export const toQueryParameter = (json) => {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key])
        }).join('&')
}

export const toDate = (date) => {
    return date ? new Date(date).toLocaleString() : "Running"
}

export const toISODateString = (date) => {
    return `${date.getFullYear()}-${numberPad(date.getMonth()+1, 2)}-${numberPad(date.getDate(), 2)}`
}

export const toTimeString = (date) => {
    if (!date)
        return ''
    date = new Date(date)
    return `${numberPad(date.getHours(), 2)}:${numberPad(date.getMinutes(), 2)}`
}

export const numberToTime = (num) => {
    num = (num + '').replace(/\D/g, "")
    if (num.length == 3 || num.length == 4){
        if (num.length == 3) 
            num = '0'+num
        
        const minutes = parseInt(num.substr(-2))
        const hours = parseInt(num.substr(-4, 2))

        if (hours < 24 && minutes < 60)
            return { hours, minutes }
    }
}

export const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date)
}

export const getTime = (d) => {
    d = d || new Date()
    return {
        hours: d.getHours(),
        minutes: d.getMinutes()
    }
}

export const compareTime = (a, b) => {
    return (a.hours > b.hours) ? 1 : (a.hours < b.hours) ? -1 : (a.minutes > b.minutes) ? 1 : (a.minutes < b.minutes) ? -1 : 0
}

export const toTimeNumber = (d) => {
    if (!d)
        return ''
    d = new Date(d)
    return `${numberPad(d.getHours(), 2)}${numberPad(d.getMinutes(), 2)}`
}

export default {
    numberPad,
    toDateLocaleString,
    toQueryParameter,
    toDate,
    toISODateString,
    toTimeString,
    numberToTime,
    isValidDate,
    getTime,
    compareTime,
    toTimeNumber,

}