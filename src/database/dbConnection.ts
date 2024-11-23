import mongoose from "mongoose"
import config from "../../config/config";


export const dbConnection = async (): Promise<void> => {
    console.log(config.port, "hey")
        if (!config.dbUrl) {
            throw new Error("MONGODB_URL is not defined in the environment variables");
        }
        else{                

            await mongoose.connect(config.dbUrl, {
                dbName: "antwaters_api"
            }).then(()=> {
                console.log("Connected to db")
            }).catch((err) => {
                console.log("Error occured while connecting to db")
            })
        }
}