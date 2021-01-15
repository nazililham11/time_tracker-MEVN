const url = 'http://localhost:3300/api/record/'
const axios = require('axios')


const Read = () => {
    return new Promise((resolve, reject) => {
        axios(url)
            .then(r => r.data)
            .then(r => resolve(r))
            .catch(e => reject(e))
    });
}

const Insert = (data) => {
    return new Promise((resolve, reject) => {
        axios({
                url,
                method: 'POST',
                data: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
            })
            .then(r => r.data)
            .then(r => resolve(r))
            .catch(e => reject(e))
    });
}


module.exports = {
    Read,
    Insert
}