import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapturePhotoRoutingModule } from './capture-photo-routing.module';
import { WebcamComponent } from './webcam/webcam.component';


@NgModule({
  declarations: [WebcamComponent],
  imports: [
    CommonModule,
    CapturePhotoRoutingModule
  ],
  exports: [WebcamComponent]
})
export class CapturePhotoModule { }
