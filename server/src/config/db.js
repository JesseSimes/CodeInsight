const mongoose= require('mongoose')

const connectDB= async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected")
    } catch (error) {
        console.log("MongoDB server connection error", error)
    }
}

module.exports = connectDB