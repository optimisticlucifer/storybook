const mongoose =require('mongoose')

const connectDB = async () => {
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })

        // const conn= await mongoose.connect('mongodb://localhost:27017/storybook');
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(err){
        console.error(err)
        process.exit()
    }
}

module.exports = connectDB