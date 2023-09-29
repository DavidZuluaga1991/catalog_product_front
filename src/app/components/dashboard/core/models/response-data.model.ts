import { Pagination } from './pagination.model';

export interface ResponseData<T> {
  data: T;
  pagination: Pagination;
}
