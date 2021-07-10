import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mobile-camera',
  templateUrl: './mobile-camera.component.html',
  styleUrls: ['./mobile-camera.component.scss']
})
export class MobileCameraComponent implements OnInit {

  private subject = new BehaviorSubject<(string | ArrayBuffer)[]>([]);
  public photoSourceList$ = this.subject.asObservable();

  imageUrl:string | ArrayBuffer;

  constructor() { }

  ngOnInit() {
  }

  onChangeTakePhoto(photoSource: HTMLInputElement) {

    const photoSourceObj = photoSource.files[0];

    if ( !!photoSourceObj ) {

      const reader = new FileReader();
      reader.readAsDataURL(photoSourceObj);
      
      reader.onload = (e) => { 
        this.imageUrl = reader.result;
  
        this.subject.next([...this.subject.getValue(), this.imageUrl]); 
  
      };

    }

  }

  deletePhoto(photoSource:string) {
    const photoSourceList = this.subject.getValue();
    const _index = photoSourceList.indexOf(photoSource);
    
    const newPhotoSourceList = photoSourceList.filter((value, index) => index !== _index);

    this.subject.next(newPhotoSourceList);

  }

}
