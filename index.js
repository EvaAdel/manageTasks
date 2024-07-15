import express from "express";
import { config } from "dotenv";
import mountRoutes from "./src/mount.routes.js";
import { db_connection } from "./DB/connection.js";
import { errorHandlerResponse } from "./src/middlewares/error-handling-middleware.js";
import { errorHandlingClass } from "./src/utils/error-class.utils.js";
import xss from "xss-clean";

const app = express();

config();

const port = process.env.PORT; //3000

app.use(express.json({ limit: "5mb" }));

app.use(xss());

mountRoutes(app);

app.use(errorHandlerResponse);

db_connection();

app.get("/", (req, res) => res.send("Hello World!"));

app.all("*", (req, res, next) => {
  // Create error and send it to error handler middleware
  next(
    new errorHandlingClass(`Can't find ${req.originalUrl} on this server!`, 400)
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//IN THE END WE MUST DELETE THE NODE_MODULES BEFORE SENDING THE project OR TO GITHUB
//IN THE END WE MUST DELETE ALL CONSOLE.LOG() FROM ANY FILE ma3da SERVER & DATABASE BEFORE SENDING THE PROJECT OR TO GITHUB
