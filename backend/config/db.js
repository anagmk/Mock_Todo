import mongoose from 'mongoose'

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectdb