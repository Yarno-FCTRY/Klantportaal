import express from "express";
import dataRoutes from "./routes/dataRoutes";

const app = express();
const port = 2000;

app.use(express.json());

// Mount routes
app.use("/api", dataRoutes);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
