import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TDelete } from './delete/delete.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [TDelete],
    declarations: [
        TDelete
    ],
    providers: [

    ]
})
export class ModalModule {
}
