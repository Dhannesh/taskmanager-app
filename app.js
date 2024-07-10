import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import "dotenv/config";
import dbConnect from "./dbConnect.js";
const app = express();

app.use(express.static('./public'))
app.use(express.json());
const port = process.env.PORT || 5000;

// routes
app.use("/api/v1/tasks", tasksRoutes);

// (() => {
//   console.log("Immediately Invoked Function Expressions (IIFE)");
// })();

(async () => {
  try {
    await dbConnect(process.env.MONGO_URL);
    console.log("Database connected");
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
})();
