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
  image?: string;
  category: Category;
  active: boolean;
  featured: boolean;
  seasonal: boolean;
  specialOffer: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}