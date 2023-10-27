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

export type Category = {
  id: string;
  name: string;
  coffeeShopId: string;
  createdAt: string;
};
