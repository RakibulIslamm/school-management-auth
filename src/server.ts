import mongoose from "mongoose";
import 'colors'
import app from "./app";
import config from './config/index'

run().catch(err => console.log(err));
async function run() {
    try{
        const conn = await mongoose.connect(config.database_url as string);
        console.log(`Database connected on host: ${conn.connection.host}`.bgBlue);
        app.listen(config.port, () => {
            console.log(`Server listening on port ${config.port}`)
        })
    }
    catch(error){
        if(error instanceof Error){
            console.log(`Database connection error: ${error.message}`.bgRed)
        }
        else{
            console.log(error)
        }
    }
}