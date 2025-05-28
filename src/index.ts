import express from "express";
import dotenv from "dotenv";
import cartRoutes from "./controllers/routes/cart.routes";
import awsServerlessExpress from "aws-serverless-express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cartRoutes);

// Handler para AWS Lambda
export const handler = async (event: any, context: any) => {
  const server = awsServerlessExpress.createServer(app);
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
