import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 't-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input() tags: Array<any> = [];
  @Output() tagsChange:EventEmitter<any>=new EventEmitter();
  remove(tag) {
    this.tags = this.tags.filter(x => x !== tag);
    this.tagsChange.emit(this.tags);
  }
}

@NgModule({
  declarations: [TagsComponent],
  imports: [CommonModule],
  exports: [TagsComponent]
})
export class TagsModule {
}
