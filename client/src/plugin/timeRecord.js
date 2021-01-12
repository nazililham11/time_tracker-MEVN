const url = 'http://'+window.location.hostname+':3000/api/record/'
const { toQueryParameter } = require('./utils')


export const Read = () => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(r => r.json())
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