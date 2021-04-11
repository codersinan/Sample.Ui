import { Component, NgModule, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { compare } from 'fast-json-patch';
import { Observable } from 'rxjs';
import { PatchProductRequest } from '../../../requests';
import { ProductResponse } from '../../../responses';

import { TagsModule } from '@headless-ui/angular';

@Component({
  selector: 'p-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements AfterViewInit {

  original: ProductResponse;
  current?: ProductResponse;

  @Input() loading: Observable<boolean>;
  @Input() set product(value) {
    this.original = value;
    this.current = { ...value };
  }

  @Output() saved: EventEmitter<ProductResponse> = new EventEmitter;
  @Output() patched: EventEmitter<PatchProductRequest> = new EventEmitter;
  @Output() cancelled: EventEmitter<void> = new EventEmitter;

  ngAfterViewInit(): void {
    this.clear();
  }

  clear() {
    this.product = this.original;
  }

  patchDocument() {
    const productPatchRequest = {
      id: this.original.id,
      operations: compare(this.original, this.current, true)
    };
    this.patched.emit(productPatchRequest);
  }

}

@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagsModule
  ],
  exports: [ItemComponent]
})
export class ItemModule {
}
