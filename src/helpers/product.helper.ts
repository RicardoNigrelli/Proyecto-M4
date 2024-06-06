import { IProduct } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${apiUrl}/products`, {
      method: "GET",
      next: { revalidate: 3600 },
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`API response status: ${res.status}, body: ${errorBody}`);
    }

    const products: IProduct[] = await res.json();
    console.log(products);
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getProductById(id: string): Promise<IProduct> {
  try {
    const products = await getProducts();
    const product = products.find((product) => product.id.toString() === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}