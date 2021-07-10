import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileCameraComponent } from './mobile-camera/mobile-camera.component';
import { WebcamComponent } from './webcam/webcam.component';

const routes: Routes = [
  {
    path: '',
    component: MobileCameraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturePhotoRoutingModule { }
