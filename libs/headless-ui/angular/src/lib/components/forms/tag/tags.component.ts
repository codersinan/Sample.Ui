import { Component, NgModule, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 't-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  inputVisible: boolean;
  @Input() tags: Array<any> = [];
  @Output() tagsChange: EventEmitter<any[]> = new EventEmitter();
  @ViewChild('tag', { static: false }) tag: ElementRef<any>;
  @HostListener('document:keyup.escape', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.inputVisible = false;
    this.tag.nativeElement.value = null;
  }
  newTag() {
    this.inputVisible = true;
    setTimeout(() => {
      this.tag.nativeElement.focus();
    }, 100);
  }
  addTag() {
    const value = this.tag.nativeElement.value;
    if (value) {
      this.tagsChange.emit([...this.tags, { name: value }]);
    }
    this.inputVisible = false;
    this.tag.nativeElement.value = null;
  }
  remove(tag) {
    this.tags = this.tags.filter(x => x !== tag);
    this.tagsChange.emit(this.tags);
  }
}

@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TagsComponent]
})
export class TagsModule {
}
