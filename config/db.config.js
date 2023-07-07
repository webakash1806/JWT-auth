const mongoose = require("mongoose")
const db_url = process.env.db_url || "mongodb://127.0.0.1/auth-with-server"


const dbConnection = () => {
    mongoose.connect(db_url)
        .then((conn) => { console.log(`connected to database ${conn.connection.host}`) })
        .then((err) => { console.log(err.message) })
}

module.exports = dbConnection

// module.exports = {
//     db_url: "mongodb://127.0.0.1/auth-with-server"
// }
