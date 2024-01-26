const mysql = require('mysql2');

const conn = mysql.createConnection({
        host: 'localhost',
        user: 'developer',
        password: '1234@dev#.',
        database: 'blog'
    })
    
async function mySqlconnection() {
    conn.connect((err) => {
        if(err) {
            throw err;
        }
        console.log('MySql Connected ...')
    })
    conn.destroy()
}

module.exports = {mySqlconnection, conn}