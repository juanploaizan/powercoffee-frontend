export type PaginationResponse<T> = {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
  coffeeShopId: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatarNumber: number | null;
};

export type Customer = {
  id: string;
  dni: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  coffeeShopId: string;
};

export type Employee = {
  id: string;
  dni: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: string;
  salary: number;
  address: string;
  hireDate: string;
  coffeeShopId: string;
};

export type Category = {
  id: string;
  name: string;
  coffeeShopId: string;
  createdAt: string;
};

export type ComboBoxOption = {
  value: string;
  label: string;
};
