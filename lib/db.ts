import mongoose from "mongoose";

const MONGODBURL = process.env.MONGODB_URL
if(!MONGODBURL){
    throw new Error("Please define the MONGODB_URI environment variable inside .env")
}

interface mongoCache{
    connection: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
}

declare global {var mongoCache: mongoCache}

let cached = global.mongoCache
if(!cached){
    cached = global.mongoCache = {connection: null, promise: null};
}

export const connectToDB = async () => {
    if(cached!.connection){
        return cached.connection
    };

    if(!cached!.promise){
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODBURL, opts).then((mongoose) => {return mongoose})
    }

    try{
        cached.connection = await cached.promise
    }catch(err){
        cached.promise = null
        throw err
    }

    return cached.connection;
}

// const connect = async () => {
//     mongoose.connect(MONGODBURL)
//         .then(() => console.log("Database Connected"))
//         .catch(() => console.error("Error in connecting Database"))
// }