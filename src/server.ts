import express from "express";
import multer from "multer";
import dataRoutes from "./routes/dataRoutes";

const app = express();
const port = 2000;

// Set up multer for handling form-data
const upload = multer();
app.use(express.json());

// Mount routes
app.use("/", dataRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
