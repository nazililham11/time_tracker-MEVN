const url = 'http://localhost:3300/api/category/'
const axios = require('axios')

const Read = () => {
    return new Promise((resolve, reject) => {
        axios(url)
            .then(r => r.data)
            .then(r => resolve(r))
            .catch(e => reject(e))
    });
}

module.exports = {
    Read,
 }