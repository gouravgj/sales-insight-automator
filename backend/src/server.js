import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoutes from "./routes/analyzeRoutes.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analyzeRoutes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sales Insight API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
