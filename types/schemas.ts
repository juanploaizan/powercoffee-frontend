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

export type Category = {
  id: string;
  name: string;
  coffeeShopId: string;
  createdAt: string;
};

export type City = {
  label: string;
  value: string;
};
