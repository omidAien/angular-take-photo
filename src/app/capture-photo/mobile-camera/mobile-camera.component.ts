import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'mobile-camera',
  templateUrl: './mobile-camera.component.html',
  styleUrls: ['./mobile-camera.component.scss']
})
export class MobileCameraComponent implements OnInit {

  private photoReadersubject = new BehaviorSubject<(string | ArrayBuffer)[]>([]);
  public readablePhotoList$ = this.photoReadersubject.asObservable();

  private filePhotoListSubject = new BehaviorSubject<{}[]>([]);
  public filePhotoList$ = this.filePhotoListSubject.asObservable()
                              .pipe(
                                map(data => data.length)
                              );

  private selectFilePhotoListSubject = new BehaviorSubject<{}[]>([]);
  public selectedPhotoList$ = this.selectFilePhotoListSubject.asObservable();

  constructor() { }

  ngOnInit() {
  }

  onChangeTakePhoto(photoSource: HTMLInputElement) {

    const photoSourceObj = photoSource.files[0];

    if ( !!photoSourceObj ) {

      const reader = new FileReader();
      reader.readAsDataURL(photoSourceObj);
      
      reader.onload = (e) => { 
        const imageUrl = reader.result;
        this.photoReadersubject.next([...this.photoReadersubject.getValue(), imageUrl]); 

        const countImage = this.photoReadersubject.getValue().length;
        let newFilePhoto = {};
        const key = "image_" + countImage;
        newFilePhoto[key] = photoSourceObj;

        if ( !!this.filePhotoListSubject.getValue() ) {
          this.filePhotoListSubject.next([...this.filePhotoListSubject.getValue() , newFilePhoto]);
        }
        else {
          this.filePhotoListSubject.next([newFilePhoto]);
        }
        

      };

    }

  }

  deletePhoto(photoSource:string) {
    const readablePhotoList = this.photoReadersubject.getValue();
    const _index = readablePhotoList.indexOf(photoSource);
    
    const newReadablePhotoList = readablePhotoList.filter((value, index) => index !== _index);

    this.photoReadersubject.next(newReadablePhotoList);

  }

  selectPhoto(imgIndex:number) {
    const selectedImage = document.getElementById(`${imgIndex}`)! as HTMLImageElement;
    const _key:string = `image_` + (imgIndex + 1);
    
     
    const filePhotoListSubject = this.filePhotoListSubject.getValue();
    const selectFilePhotoListSubject = this.selectFilePhotoListSubject.getValue();

    let selectedFilePhoto;

    filePhotoListSubject.filter(objPhoto => {
      if ( Object.keys(objPhoto)[0] === _key ) {
        selectedFilePhoto = objPhoto;
      }
    });

    if ( selectFilePhotoListSubject.length > 0 ) {

      selectFilePhotoListSubject.map(objPhoto => {
        if ( Object.keys(objPhoto)[0] === _key ) {
          
          const newSelectFilePhotoListSubject = selectFilePhotoListSubject.filter(objPhoto => Object.keys(objPhoto)[0] !== _key);
          this.selectFilePhotoListSubject.next(newSelectFilePhotoListSubject);

        }
      });

    }
    else {
      this.selectFilePhotoListSubject.next([selectedFilePhoto]);
    }


    // 2. show div.image-selected-symbol
    const parentElement = (selectedImage.parentElement)! as HTMLDivElement;
    const imageSelectedSymbol = parentElement.querySelector("div.image-selected-symbol")! as HTMLDivElement;

    if ( imageSelectedSymbol.classList.contains("active") ) {
      imageSelectedSymbol.classList.remove("active");
      imageSelectedSymbol.classList.add("deactive");
    }
    else {
      imageSelectedSymbol.classList.remove("deactive");
      imageSelectedSymbol.classList.add("active");
    }

    console.log(this.selectFilePhotoListSubject.getValue())

  }

}
