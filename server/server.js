require("dotenv").config();
const app = require("./src/app")
const connectDB = require("./src/config/db")

let dataBase = process.env.MONGODB_URI
let port = process.env.PORT || 4000

connectDB();

app.listen(port, () => {
    console.log(`Server is running ${port} port`)
})
