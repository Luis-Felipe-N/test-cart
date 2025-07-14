import { Either, failure, success } from "../either";
import { CartPayload, CartResponse, Product } from "../types/cart";

const FAKE_STORE_API = "https://fakestoreapi.com";

type CartServiceResponse = Either<
  Error,
  {
    cartProducts: CartResponse[];
  }
>;

/**
 * Logica do desafio fica aqui
 * Estou tratando os erros com "Either Type"
 * O service retorna um error (failure) ou o objeto da de retorno do post (success)
 * @Refer: https://dev.to/milos192/error-handling-with-the-either-type-2b63
 */
export class CartService {
  async execute(): Promise<CartServiceResponse> {
    try {
      // PRIMEIRO PASSO. Buscando os produtos
      const productsResponse = await fetch(
        `${FAKE_STORE_API}/products?limit=3`
      );

      const products: Product[] = await productsResponse.json();

      // SEGUNDO PASSO: Validando os 3 produtos após a requisição
      if (!products) {
        return failure(
          new Error("Nenhum produto encontrado para adicionar ao carrinho.")
        );
      }

      //   TERCEIRO PASSO: CRIANDO O PAYLOAD
      const cartPayload: CartPayload = {
        userId: 1,
        date: new Date().toISOString(),
        products: products.map((product) => ({
          productId: product.id,
          quantity: 1,
        })),
      };

      //   Adicionando os produtos
      const cartResponse = await fetch(`${FAKE_STORE_API}/carts`, {
        method: "POST",
        body: JSON.stringify(cartPayload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!cartResponse.ok) {
        throw new Error("Falha ao criar o carrinho.");
      }

      // Retornando o cart com sucesso
      const cart = await cartResponse.json();

      return success({
        cartProducts: cart,
      });
    } catch (error) {
      return failure(
        new Error("Ocorreu uma falha na comunicação com a API externa.")
      );
    }
  }
}
