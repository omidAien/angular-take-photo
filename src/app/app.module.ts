import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CapturePhotoModule } from './capture-photo/capture-photo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CapturePhotoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
