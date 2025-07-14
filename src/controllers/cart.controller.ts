import { FastifyReply, FastifyRequest } from "fastify";
import { CartService } from "../services/cart.service";

export async function cart(_: FastifyRequest, reply: FastifyReply) {
  const service = new CartService();

  const result = await service.execute();

  // Retornando 201 caso acha sucesso
  // Se for error (failure) o app vai tratar e retornar o { message: '' }
  return reply.status(201).send(result.value);
}
