import express from 'express';
import pool from "./database/index.js";
import cors from 'cors';
import bodyParser from 'body-parser';
import table from './database/table.js';
import errorHandler from './middleware/errorHandler.js';
import router from './router/routes.js';
const Application= async() => {
  const app = express();
  app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(bodyParser.json());

  app.use(errorHandler);
  app.use("/api/v1", router);


  pool.connect((err) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Connected to the database');
    }
  });
  pool.query(table, (err) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
      console.log('Tables created successfully');
    }
  });
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  return app;

}   

Application();