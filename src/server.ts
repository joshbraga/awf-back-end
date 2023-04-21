import * as dotenv from 'dotenv'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import fs from 'fs';
import path from 'path';
import https from 'https';

import { postRoutes } from './routes/posts.routes';

dotenv.config();

const PORT: number = 7000;

let options = {};

if (process.env.LOCAL_DEPLOYMENT) {
  options = {
    key: fs.readFileSync(path.resolve(__dirname, "../localhost-key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "../localhost.pem"))
  }
}



const app = express();

app.use('/posts', postRoutes);
//app.use('/users', userRoutes);


mongoose
  //mongodb+srv://administrator:cvLrdOiTvoQlscbC@roomate-hub-cluster.oo7vsvf.mongodb.net/test
  .connect(`mongodb+srv://administrator:cvLrdOiTvoQlscbC@roomate-hub-cluster.oo7vsvf.mongodb.net/roomateHub`)
  //.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@roomate-hub-cluster.oo7vsvf.mongodb.net/roomateHub`)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log('Failed to connect ', err));

mongoose.connection.once('open', function () {
  console.log('Mongoose: MongoDB database connection established successfully');
});



if (process.env.LOCAL_DEPLOYMENT) {
  const server = https.createServer(options, app);
  server.listen(443, () => {
    console.log(`Listening on port hi ${443}`);
  });
} else {
  app.listen(443, () => {
    console.log(`Listening on port hi ${443}`);
  });
}





//mongodb+srv://administrator:cvLrdOiTvoQlscbC@roomate-hub-cluster.oo7vsvf.mongodb.net/roomateHub