const mongoose = require("mongoose")
const db_url = "mongodb://127.0.0.1/auth-with-server" || process.env.db_url
console.log(db_url)

const dbConnection = () => {
    mongoose.connect(db_url)
        .then((conn) => { console.log(`connected to database ${conn.connection.host}`) })
        .catch((err) => { console.log("error") })
}

module.exports = dbConnection

// module.exports = {
//     db_url: "mongodb://127.0.0.1/auth-with-server"
// }
