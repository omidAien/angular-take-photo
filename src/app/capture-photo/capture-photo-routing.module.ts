import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebcamComponent } from './webcam/webcam.component';

const routes: Routes = [
  {
    path: '',
    component: WebcamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturePhotoRoutingModule { }
