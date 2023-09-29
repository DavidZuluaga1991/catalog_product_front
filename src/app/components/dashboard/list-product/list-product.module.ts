import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductRoutingModule } from './list-product-routing.module';
import { ListProductComponent } from './list-product.component';
import { ProductModule } from '@dashboard/shared/product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '@dashboard/core/services/product.service';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListProductComponent],
  imports: [
    CommonModule,
    ListProductRoutingModule,
    ProductModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
})
export class ListProductModule {}
