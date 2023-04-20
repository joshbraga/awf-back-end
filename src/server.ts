import * as dotenv from 'dotenv'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import fs from 'fs';
import path from 'path';
import https from 'https';

dotenv.config();

const PORT: number = 7000;

const app = express();

const server = https.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port hi ${PORT}`);
})