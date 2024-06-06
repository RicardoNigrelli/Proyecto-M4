interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
}

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

export class UserLoginDtos {
  email: string;
  password: string;
  
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class UserLoginTouchedDtos {
  email: boolean;
  password: boolean;

  constructor(email: boolean, password: boolean) {
    this.email = email;
    this.password = password;
  }
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

export class UserDtos {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  repeatPassword: string;

  constructor(
    name: string,
    email: string,
    address: string,
    phone: string,
    password: string,
    repeatPassword: string
  ) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.password = password;
    this.repeatPassword = repeatPassword;
  }
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
};