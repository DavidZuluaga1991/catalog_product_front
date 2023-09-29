import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeAction } from '@dashboard/core/enums/type-actions.enum';
import { Pagination } from '@dashboard/core/models/pagination.model';
import { Product } from '@dashboard/core/models/product.model';
import { ProductService } from '@dashboard/core/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  public products: Product[] = [];
  public pagination: Pagination = { pageSize: 10, page: 2 };

  constructor(
    private productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getListProducts(this.pagination.pageSize, this.pagination.page);
  }

  getListProducts(pageSize: number, page: number): void {
    this.productService.getAllProducts({ pageSize, page }).subscribe((data) => {
      this.products = data.data;
      this.pagination = data.pagination;
    });
  }

  executeAction(type: TypeAction, product: Product): void {
    const id = type === TypeAction.EDIT ? product._id : '';
    this.router.navigate([`dashboard/product/${id}`]);
  }
}