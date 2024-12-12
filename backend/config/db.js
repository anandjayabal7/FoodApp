import mongoose from "mongoose";

const connectDB=async()=>{
    await mongoose.connect('mongodb://localhost:27017/food_del').then(()=>{
        console.log("DB Connected");
    })

    
}

export default connectDB