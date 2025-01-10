export interface ProductData {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface Product extends ProductData {
  $key: string;
}
