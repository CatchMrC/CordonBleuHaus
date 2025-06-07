export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image?: string;
}