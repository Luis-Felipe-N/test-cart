import { Either, failure, success } from "../either";

const FAKE_STORE_API = "https://fakestoreapi.com";

export interface CartPayload {
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
}

type CartServiceResponse = Either<
  Error,
  {
    cartProducts: any;
  }
>;

export class CartService {
  async execute() {
    try {
      const productsResponse = await fetch(
        `${FAKE_STORE_API}/products?limit=3`
      );
      //   .then((response) => response.json());
      const products = await productsResponse.json();

      if (!products) {
        return failure(
          new Error("Nenhum produto encontrado para adicionar ao carrinho.")
        );
      }

      const payload: CartPayload = {
        userId: 1,
        date: new Date().toISOString(),
        products: products.map((product) => ({
          productId: product.id,
          quantity: 1,
        })),
      };

      const cartResponse = await fetch(`${FAKE_STORE_API}/carts`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!cartResponse.ok) {
        throw new Error("Falha ao criar o carrinho.");
      }

      const cart = await cartResponse.json();
      console.log({ cart });
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
