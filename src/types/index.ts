interface Credential {
  credentialId: number;
  password: string;
}

export interface AllOrders {
  date: string;
  status: string;
  products: {
    name: string;
    description: string;
    image: string;
    price: number;
  }[];
}

export interface IOrder {
  orderId: number;
  status: string;
  date: Date;
  user: IUser;
  products: IProduct[];
}

enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  userId: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: Role;
  credential: Credential;
  orders: IOrder[];
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

export interface UserLoginDtos {
  email: string;
  password: string;

}

export interface UserLoginTouchedDtos {
  email: boolean;
  password: boolean;

}

export interface UserLoginResponse {
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  orders: IOrder[];
  id: number;
}

export interface UserDtos {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  repeatPassword: string;
}

export interface OrderDtos {
  products: number[]
}

export interface UserFilterDto {
  [key: string]: string;
}

export interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface Review {
  name: string;
  image: string;
  review: string;
}

