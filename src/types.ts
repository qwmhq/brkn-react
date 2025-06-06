export interface Product {
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  delivery: {
    from: string;
    to: string;
  };
  sections: { title: string, content: string; }[]
}

export interface CartItem {
  product: Product;
  quantity: number;
}
