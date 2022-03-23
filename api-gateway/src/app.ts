import express, { Application } from "express";
import tripRoutes from "./router/tripRoutes";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 8000;
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(tripRoutes);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
