const url = 'http://'+window.location.hostname+':3300/api/record/'
const { toQueryParameter } = require('./utils')

function groupByDate(dataset){
    let grouped = dataset.reduce((prev, data) => {
        const date = new Date(data.timeStart)
    	const key = data.timeFinish ? `${(date.getMonth() + 1)}-${(date.getDate())}-${date.getFullYear()}` : 'Running'
        prev[key] = (prev[key] || []).concat(data)
        return prev
    },{})
    grouped = Object.entries(grouped).map(([k,v]) => {
        const timeSpan = { hours: 0, minutes: 0 }
        v.forEach(e => {
            if (e.timeSpan){
                timeSpan.hours += e.timeSpan.hours
                timeSpan.minutes += e.timeSpan.minutes
            }
        })
        timeSpan.hours = timeSpan.hours + parseInt(timeSpan.minutes / 60)
        timeSpan.minutes = timeSpan.minutes % 60
        return { timeSpan, date: k, data: v }
    })
    console.log(grouped)
    return grouped
}

function getTimeSpan(dataset){
    dataset.map(data => {
        if (data.timeFinish){
            const timeSpan = data.timeFinish - data.timeStart
            const hours = parseInt(timeSpan / (3600000))
            const minutes = parseInt((timeSpan % 3600000) / 60000)
            data.timeSpan = { hours, minutes }
        }
        return data
    })
    // console.log(dataset)
    return dataset
}

export const Read = () => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(r => r.json())
            .then(r => getTimeSpan(r))
            .then(r => groupByDate(r))
            .then(r => resolve(r))
            .catch(e => reject(e))
    });
}

export const Insert = (data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
            })
            .then(r => r.json())
            .then(r => resolve(r))
            .catch(e => reject(e))
    });
}


export const Remove = (id) => {
    return new Promise((resolve, reject) => {
        fetch(url + toQueryParameter({ id }), { 
                method: 'DELETE',
            })
            .then(r => r.json())
            .then(r => resolve(r))
            .catch(e => reject(e))
    });
}


export const Update = (id, data) => {
    const body = {id: id, ...data}
    console.log(body)
    return new Promise((resolve, reject) => {
        fetch(url, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {"Content-Type": "application/json"},
            })
            .then(r => r.json())
            .then(r => resolve(r))
            .catch(e => reject(e))
    });
}

export default {
    Read,
    Insert,
    Remove,
    Update
}