import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/response-data.model';
import { Product } from '../models/product.model';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private uri = environment.uri;

  constructor(private http: HttpClient) {}

  public getAllProducts(
    pagination: Pagination
  ): Observable<ResponseData<Product[]>> {
    const url = `${this.uri}api/product`;
    const params = new HttpParams()
      .set('pageSize', pagination.pageSize)
      .set('page', pagination.page);
    return this.http.get<ResponseData<Product[]>>(url, { params });
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
