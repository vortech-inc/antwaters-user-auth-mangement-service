import dotenv from "dotenv";

dotenv.config()




const config = {
    port: process.env.APPLICATION_PORT,
    secretKey: process.env.SECRETKEY,
    dbUrl:  process.env.MONGODB_URL,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: "ANTWATERS_E_HEALTH",
    MEDICAL_SERVICE_BINDING_KEY: "MEDICAL_RECORD_BINDING_KEY",
    USER_SERVICE_BINDING_KEY: "USER_BINDING_KEY",
    COMMUNICATION_SERVICE_BINDING_KEY: "COMMUNICATION_BINDING_KEY",
    QUEUE_NAME: "USER_QUEUE"

}

export default config