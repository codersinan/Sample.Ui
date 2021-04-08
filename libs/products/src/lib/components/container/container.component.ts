import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListModule } from './list/list.component';
import { ItemModule } from './item/item.component';

import { ProductsStore } from '../../products.store';
import { PatchProductRequest } from '../../requests';
import { ProductResponse } from '../../responses';

@Component({
  selector: 'p-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  vm$ = this.productStore.vm$;

  constructor(
    private productStore: ProductsStore,
  ) { }

  ngOnInit(): void {
    this.productStore.getProducts();
  }
  selectProduct(product: ProductResponse) {
    this.productStore.selectProduct(product);
  }
  saveProduct(product) {
    if (!product.id) {
      this.productStore.addProduct(product);
    } else {
      this.productStore.updateProduct(product);
    }
  }

  patchProduct(product: PatchProductRequest) {
    this.productStore.patchProduct(product);
  }

  deleteProduct(product) {
    this.productStore.deleteProduct(product.id);
  }

  getErrors(error: HttpErrorResponse) {
    return Object.values(error.error.errors);
  }

}

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ListModule,
    ItemModule
  ],
  exports: [ContainerComponent]
})
export class ContainerModule {
}
