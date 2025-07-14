import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CartService } from "../services/cart.service";

export async function cart(request: FastifyRequest, reply: FastifyReply) {
  const service = new CartService();

  const result = await service.execute();

  return reply.status(201).send(result.value);
}
