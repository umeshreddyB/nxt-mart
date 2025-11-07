import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './src/configur/config.js';
import route from "./src/routes/routes.js"

import cors from 'cors';



const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT 
const MONGO_URL = process.env.MONGO_URL 
if(!MONGO_URL){
      console.error("MongoURI is missing in .env file")
      process.exit(1)
  }
  

  async function main(){
      try{
          await connectDB(MONGO_URL)

          app.listen(PORT, ()=>{
                console.log(`Server is running on port ${PORT}`)
          })
          

      }catch(e){
          console.error("Failed to connect")
          process.exit(1)
      }
  }
  main()
app.use("/",route)


