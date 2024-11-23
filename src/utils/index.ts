import amqplib, { Channel, ConsumeMessage } from "amqplib"
import config from "../../config/config"

// const {EXCHANGE_NAME, MESSAGE_BROKER_URL="amqp://localhost"} = config
const {EXCHANGE_NAME, MESSAGE_BROKER_URL, USER_SERVICE_BINDING_KEY, QUEUE_NAME} = config
export const createChannel = async () :Promise<Channel> => {

    if(!MESSAGE_BROKER_URL){
        throw new Error("MESSAGE_BROKER_URL is invalid")
    }

    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL)
        const channel = await connection.createChannel()
        await channel.assertExchange(EXCHANGE_NAME, "direct", {durable: false})
        return channel
    } catch (error) {
        throw error
    }

}

export const publismMessage = async (channel: Channel, binding_key:string , message: string) => {
  channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message))

 try {
     channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message))

 } catch (error) {
    throw error
 }
}

export const subscribeMessage = async (channel: Channel, service:any) => {


    try {
        
  
    const appQueue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, USER_SERVICE_BINDING_KEY)

    channel.consume(appQueue.queue, (data: ConsumeMessage | null) => {
        if(data){
            console.log("recieved data")
            console.log(data?.content.toString())
            channel.ack(data)
        }     
     
    },
       { noAck: false })
    } catch (error) {
        console.log("failed to consume user", error)    
            
    }
}