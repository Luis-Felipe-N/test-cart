import { FastifyInstance } from "fastify";
import { cart } from "../controllers/cart.controller";

export async function cartRoutes(app: FastifyInstance) {
  app.get("/cart", cart);
}
