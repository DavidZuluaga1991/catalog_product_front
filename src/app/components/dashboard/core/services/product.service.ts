import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/response-data.model';
import { Product } from '../models/product.model';
import { Pagination } from '../models/pagination.model';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private uri = environment.uri;

  constructor(private http: HttpClient) {}

  public getAllProducts(
    pagination: Pagination,
    filter?: Filter
  ): Observable<ResponseData<Product[]>> {
    const url = `${this.uri}api/product/filter`;
    return this.http.post<ResponseData<Product[]>>(url, { pagination, filter });
  }

  public getProduct(id: string): Observable<Product> {
    const url = `${this.uri}api/product/${id}`;
    return this.http.get<Product>(url);
  }

  public createProduct(product: Product): Observable<Product> {
    const url = `${this.uri}api/product`;
    return this.http.post<Product>(url, product);
  }

  public deleteProduct(id: string): Observable<any> {
    const url = `${this.uri}api/product/${id}`;
    return this.http.delete(url);
  }

  public updateProduct(id: string, product: Product): Observable<Product> {
    const url = `${this.uri}api/product/${id}`;
    return this.http.patch<Product>(url, product);
  }
}
