import { Component, NgModule, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductResponse } from '../../../responses';

@Component({
  selector: 'p-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() products: ProductResponse[];
  @Input() selected: ProductResponse;
  @Output() select: EventEmitter<ProductResponse> = new EventEmitter();
  @Output() delete: EventEmitter<ProductResponse> = new EventEmitter();

}

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule],
  exports: [ListComponent]
})
export class ListModule {
}
