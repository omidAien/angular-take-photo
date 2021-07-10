import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapturePhotoRoutingModule } from './capture-photo-routing.module';
import { WebcamComponent } from './webcam/webcam.component';
import { MobileCameraComponent } from './mobile-camera/mobile-camera.component';


@NgModule({
  declarations: [WebcamComponent, MobileCameraComponent],
  imports: [
    CommonModule,
    CapturePhotoRoutingModule
  ],
  exports: [WebcamComponent]
})
export class CapturePhotoModule { }
