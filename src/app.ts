import fastify from "fastify";
import { ZodError } from "zod";

export const app = fastify();

app.setErrorHandler((err, _, reply) => {
  /**
   * Tratamento de erro com ZOD
   * Refers: https://github.com/Luis-Felipe-N/anime-api-v2/blob/main/src/app.ts#L29
   */

  try {
    return reply.status(err.statusCode || 500).send({ message: err.message });
  } catch (error) {
    if (err instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: "Validation Error", issues: err.format() });
    }
  }

  return reply.status(500).send({ message: "Internal server error" });
});
