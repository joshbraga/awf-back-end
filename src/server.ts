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
import { authRoutes } from './routes/auth.routes';

dotenv.config();

const PORT = process.env.PORT || 7000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.use('/auth', authRoutes);
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
  const options = {
    key: fs.readFileSync(path.resolve(__dirname, "../localhost-key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "../localhost.pem"))
  }
  const server = https.createServer(options, app);
  server.listen(PORT, () => {
    console.log(`Listening on port hi ${PORT}`);
  });

} else {
  app.listen(PORT, () => {
    console.log(`Listening on port hi ${PORT}`);
  });
}






//mongodb+srv://administrator:cvLrdOiTvoQlscbC@roomate-hub-cluster.oo7vsvf.mongodb.net/roomateHub