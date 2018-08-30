var fs = require('fs')
const N26 = require('n26')

module.exports = (user, pwd) => {
    return new Promise((result) => {
        new N26(user, pwd).then(account => {
            account.transactions().then(res => {
                fs.writeFile('rawTransactions.json', JSON.stringify(res), 'utf8', console.log);
                return result(res)
            })
        })
    })
}
