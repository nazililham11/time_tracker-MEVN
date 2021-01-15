const numberPad = (num, size) => {
    num = num.toString()
    while (num.length < size) num = "0" + num
    return num
}

const toTimeString = (date) => {
    if (!date)
        return ''
    date = new Date(date)
    return `${numberPad(date.getHours(), 2)}:${numberPad(date.getMinutes(), 2)}`
}

const numberToTime = (num) => {
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

const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date)
}

const getTime = (d) => {
    d = d || new Date()
    return {
        hours: d.getHours(),
        minutes: d.getMinutes()
    }
}

const toNCharacter = (str, len) => {
    str = str + ''
    if (str.length > len)
        str = str.substr(0, len-2) + '..'
    while (str.length < len) 
        str = str + ' '
    return str
}
module.exports = {
    numberPad,
    getTime,
    toTimeString,
    numberToTime,
    isValidDate,
    toNCharacter,
}