import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import { DialogRef } from '@ngneat/dialog';
@Component({
  selector: 't-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class TDelete {
  constructor(public ref:DialogRef){}
}
