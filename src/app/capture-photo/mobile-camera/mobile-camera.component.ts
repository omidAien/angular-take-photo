import { Renderer2 } from '@angular/core';
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

  constructor(private render: Renderer2) { }

  ngOnInit() {
  }

  onChangeTakePhoto(photoSource: HTMLInputElement) {

    const photoSourceObj = photoSource.files[0];

    if ( !!photoSourceObj ) {

      const reader = new FileReader();
      reader.readAsDataURL(photoSourceObj);
      
      reader.onload = (e) => { 
        const imageUrl = reader.result;
  
        this.subject.next([...this.subject.getValue(), imageUrl]); 
  
      };

    }

  }

  deletePhoto(photoSource:string) {
    const photoSourceList = this.subject.getValue();
    const _index = photoSourceList.indexOf(photoSource);
    
    const newPhotoSourceList = photoSourceList.filter((value, index) => index !== _index);

    this.subject.next(newPhotoSourceList);

  }

  selectPhoto(imgIndex:number) {
    const selectedImage = document.getElementById(`${imgIndex}`)! as HTMLImageElement;
    
    const parentElement = (selectedImage.parentElement)! as HTMLDivElement;

    // hidden button.image-select-controler
    const imageSelectControler = parentElement.querySelector("button.image-select-controler")! as HTMLButtonElement;
    imageSelectControler.classList.add("deactive");

    // hidden button.image-select-controler
    const imageDeleteControler = parentElement.querySelector("button.image-delete-controler")! as HTMLButtonElement;
    imageDeleteControler.classList.add("deactive");

    // show div.image-selected-symbol
    const imageSelectedSymbol = parentElement.querySelector("div.image-selected-symbol")! as HTMLDivElement;
    imageSelectedSymbol.classList.add("active");

  }

}
