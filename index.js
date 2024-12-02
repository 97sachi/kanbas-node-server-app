import express from 'express';
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import "dotenv/config";
import UserRoutes from './Kanbas/Users/routes.js';
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';



import cors from "cors";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();

const corsOptions = {
  credentials: true,
  origin: [
    process.env.NETLIFY_URL || "https://a6--amazing-bunny-e6043a.netlify.app",
    "http://localhost:3000", // For local development
  ],
};
  


const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: CONNECTION_STRING,
    }),
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
  }
  app.use(session(sessionOptions));
  app.use(express.json());
UserRoutes(app);
CourseRoutes(app);

ModuleRoutes(app);

AssignmentRoutes(app);
EnrollmentRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000)