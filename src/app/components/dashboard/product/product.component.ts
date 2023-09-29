import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeAction } from '@dashboard/core/enums/type-actions.enum';
import { TypeProduct } from '@dashboard/core/enums/type-products.enum';
import { Product } from '@dashboard/core/models/product.model';
import { ProductService } from '@dashboard/core/services/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() id!: string;

  public imageBase = 'https://cdn-icons-png.flaticon.com/512/2/2120.png';
  public typeAction = TypeAction;
  public changeData = false;
  public listTypeProducts = Object.keys(TypeProduct);
  private destroySubscribe$ = new Subject();

  public productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    sku: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.getProduct();
    }
    this.getChangesForm();
  }

  ngOnDestroy(): void {
    this.destroySubscribe$.next(true);
    this.destroySubscribe$.complete();
  }

  getProduct(): void {
    this.productService
      .getProduct(this.id)
      .pipe(takeUntil(this.destroySubscribe$))
      .subscribe((product: Product) => {
        Object.keys(product).forEach((key) => {
          const value = product[key as keyof typeof product];
          this.productForm.get(key)?.setValue(value);
        });
        this.changeData = false;
      });
  }

  actions(action: TypeAction): void {
    if (action === TypeAction.DELETE) this.deleteProduct();
    if (action === TypeAction.UPDATE) this.updateProduct();
    if (action === TypeAction.CREATE) this.createProduct();
  }

  private getChangesForm(): void {
    this.productForm.valueChanges
      .pipe(takeUntil(this.destroySubscribe$))
      .subscribe((value) => {
        if (!this.changeData) this.changeData = true;
      });
    this.productForm
      .get('name')
      ?.valueChanges.pipe(takeUntil(this.destroySubscribe$))
      .subscribe((value) => {
        this.productForm.get('sku')?.setValue(value.trim().replace(/ /g, '-'));
      });
  }

  private deleteProduct(): void {
    this.productService
      .deleteProduct(this.id)
      .pipe(takeUntil(this.destroySubscribe$))
      .subscribe((product) => {
        this.router.navigate(['dashboard/list']);
      });
  }

  private updateProduct(): void {
    this.productService
      .updateProduct(this.id, this.productForm.value)
      .pipe(takeUntil(this.destroySubscribe$))
      .subscribe((product) => {
        this.router.navigate(['dashboard/list']);
      });
  }

  private createProduct(): void {
    this.productService
      .createProduct(this.productForm.value)
      .pipe(takeUntil(this.destroySubscribe$))
      .subscribe((product) => {
        this.router.navigate(['dashboard/list']);
      });
  }
}
