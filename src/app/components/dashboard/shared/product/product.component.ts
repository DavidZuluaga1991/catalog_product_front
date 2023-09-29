import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TypeAction } from '@dashboard/core/enums/type-actions.enum';
import { Product } from '@dashboard/core/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  @Output() action = new EventEmitter<TypeAction>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    console.log(this.product);
  }

  selectAction(): void {
    this.action.emit(TypeAction.EDIT);
  }

  redirecToProduct(id: string | undefined) {
    this.router.navigate([`dashboard/product/${id}`]);
  }
}
