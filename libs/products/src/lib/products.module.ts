import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ContainerComponent, ContainerModule } from './components/container/container.component';
import { ProductsStore } from './products.store';

export const routes: Route[] = [
  { path: '', component: ContainerComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ContainerModule,

    RouterModule.forChild(routes)
  ],
  providers: [ProductsStore]
})
export class ProductsModule { }
