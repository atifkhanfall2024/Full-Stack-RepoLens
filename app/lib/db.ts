import mongoose from "mongoose";

const ConnectDb = async()=>{

    // first check if connection string is present or not
    const ConnectString = process.env.Connection_String
    if(!ConnectString){
        throw new Error("Connection String not present")
    }

    // also check if connection already exist 
    if(mongoose.connection.readyState===1){
        console.log("Connection Already Exist");
        return
    }

    try {
        await mongoose.connect(ConnectString)
        console.log("Database Connection Success");
    } catch (error) {
       console.error("Database Connection Error:", error);
    }

}

export default ConnectDb