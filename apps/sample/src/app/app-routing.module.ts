import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    {
        path: 'products',
        loadChildren: () => import('@sample-ui/products').then(m => m.ProductsModule)
    },
    { path: '**', component: PageNotFoundComponent },
]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
