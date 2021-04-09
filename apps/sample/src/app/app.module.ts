import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DialogModule } from '@ngneat/dialog';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,    
    DialogModule.forRoot({sizes:{
      sm:{
        width:'200px',
        minHeight:'100px'
      },
      md:{
        width:'500px',
        minHeight:'100px'
      }
    },})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
