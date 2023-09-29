import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeAction } from '@dashboard/core/enums/type-actions.enum';
import { Pagination } from '@dashboard/core/models/pagination.model';
import { Product } from '@dashboard/core/models/product.model';
import { ProductService } from '@dashboard/core/services/product.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public pagination: Pagination = { pageSize: 10, page: 1 };

  public filterForm: FormGroup = new FormGroup({
    name: new FormControl(undefined),
    type: new FormControl(undefined),
  });

  private destroySubscribe$ = new Subject();

  constructor(
    private productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getListProducts(this.pagination.pageSize, this.pagination.page);
    this.filterForm.valueChanges
      .pipe(
        takeUntil(this.destroySubscribe$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.getListProducts(this.pagination.pageSize, this.pagination.page);
      });
  }

  ngOnDestroy(): void {
    this.destroySubscribe$.next(true);
    this.destroySubscribe$.complete();
  }

  getListProducts(pageSize: number, page: number): void {
    this.productService
      .getAllProducts({ pageSize, page }, this.filterForm.value)
      .pipe(takeUntil(this.destroySubscribe$))
      .subscribe((data) => {
        this.products = data.data;
        this.pagination = data.pagination;
      });
  }

  increaseOrDecreasePagination(page: number) {
    const tempPage = this.pagination.page + page;
    if (tempPage >= 1 && tempPage <= (this.pagination.totalPages ?? 1))
      this.getListProducts(this.pagination.pageSize, tempPage);
  }

  selectPage(page: number) {
    this.getListProducts(this.pagination.pageSize, page);
  }

  prueba() {
    console.log(this.pagination);
  }

  executeAction(type: TypeAction, product: Product): void {
    const id = type === TypeAction.EDIT ? product._id : '';
    this.router.navigate([`dashboard/product/${id}`]);
  }
}
