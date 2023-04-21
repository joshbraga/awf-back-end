import * as dotenv from 'dotenv'
import express, {Request, Response, NextFunction} from 'express'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import fs from 'fs';
import path from 'path';
import https from 'https';
import jwt from 'jsonwebtoken';

import { postRoutes } from './routes/posts.routes';
import { authRoutes } from './routes/auth.routes';
import { dwellingRoutes } from './routes/dwelling.routes';
import { userRoutes } from './routes/user.routes';

const JWT_ACCESS_TOKEN_SECRET = '1435ca643179a0f706f8e271c66aa2266be943ba965ce716c48da483526a112d93a93bd913c1fdddad0d2e47dfa7c70b82dd806b1c6bdad32df309c9af9dc56e';
const JWT_REFRESH_TOKEN_SECRET = '0154441011bfdc6a693ebc6ebd0943354dcc6a405d33e69492cf1ea2fb088e39fcde9f31192229307cfc0a6106edcb6fbdef910e4a8a04d3f5bcb33e5de42faf';

const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://roommate-hub.azurewebsites.net',
  'https://roommate-hub.azurewebsites.net'
];

dotenv.config();


const PORT = process.env.PORT || 7000;

const app = express();


const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Disallowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}

app.use(helmet());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/auth', authRoutes);
app.use('/dwelling', dwellingRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

//validateJWT
app.use((req: Request, res: Response, next: NextFunction) => {
  const header = req.headers['authorization'];
  if (!header) {
    return res.sendStatus(400);
  }
  const token = header.split(' ')[1];

  jwt.verify(
    token,
    JWT_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({message: 'jwt authentication failure'});
      }
      res.locals.username = (decoded as any).username;
      next();
    }
  )
});


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