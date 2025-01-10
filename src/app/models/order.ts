export interface Order {
  datePlaced: number;
  items: {
    product: {
      title: string;
      imageUrl: string;
      price: number;
    };
    quantity: number;
    totalPrice: number;
  }[];
  shipping: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
  };
  userId: string;
}
