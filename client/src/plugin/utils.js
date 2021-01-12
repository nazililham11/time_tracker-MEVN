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
                encodeURIComponent(json[key]);
        }).join('&');
}
export const toDate = (date) => {
    return date ? new Date(date).toLocaleString() : "-"
}

export default {
    numberPad,
    toDateLocaleString,
    toQueryParameter,
    toDate
}