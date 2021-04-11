import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'sample-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(public router: Router) { }
}

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {
}
