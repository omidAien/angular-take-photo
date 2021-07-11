import { Component, OnInit, DoCheck } from '@angular/core';
import { BehaviorSubject, noop } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators'

@Component({
  selector: 'mobile-camera',
  templateUrl: './mobile-camera.component.html',
  styleUrls: ['./mobile-camera.component.scss']
})
export class MobileCameraComponent implements OnInit {

  private photoReadersubject = new BehaviorSubject<(string | ArrayBuffer)[]>([]);
  public readablePhotoList$ = this.photoReadersubject.asObservable();


  private filePhotoListSubject = new BehaviorSubject<{}[]>([]);
  public filePhotoList$ = this.filePhotoListSubject.asObservable();

  private selectFilePhotoListSubject = new BehaviorSubject<{}[]>([]);
  public selectedPhotoList$ = this.selectFilePhotoListSubject.asObservable()
                                  .pipe(
                                    map((data) => data.length)
                                  );

  constructor() { }

  ngOnInit() {}

  TakePhoto(photoSource: HTMLInputElement) {

    const photoSourceObj = photoSource.files[0];

    if ( !!photoSourceObj ) {

      const reader = new FileReader();
      reader.readAsDataURL(photoSourceObj);
      
      reader.onload = (e) => { 
        const imageUrl = reader.result;

        this.photoReadersubject.next([...this.photoReadersubject.getValue(), imageUrl]); 

        const photoReadersubjectLength = this.photoReadersubject.getValue().length;

        this.filePhotoHandler(photoSourceObj, photoReadersubjectLength);

      };

    }

  }

  filePhotoHandler(photoSourceObj: File, index:number) {

    let newFilePhoto = {};
    const key = "image_" + index;
    newFilePhoto[key] = photoSourceObj;

    if ( !!this.filePhotoListSubject.getValue() ) {
      this.filePhotoListSubject.next([...this.filePhotoListSubject.getValue() , newFilePhoto]);
    }
    else {
      this.filePhotoListSubject.next([newFilePhoto]);
    }

  }

  deletePhoto(photoSource:string) {
    const readablePhotoList = this.photoReadersubject.getValue();
    const _index = readablePhotoList.indexOf(photoSource);
    
    const newReadablePhotoList = readablePhotoList.filter((value, index) => index !== _index);

    this.photoReadersubject.next(newReadablePhotoList);

  }

  selectPhoto(imgKey:string) {
    
    const selectFilePhotoListSubject = this.selectFilePhotoListSubject.getValue();

    if ( !this.photoIsSelected(imgKey) ) {
      // if the photo has not selected previously, we add it to selectFilePhotoListSubject when user click on photo
      this.selectFilePhotoListSubject.next([...selectFilePhotoListSubject, this.findFilePhotoByKey(imgKey)]);
    }
    else {
      // if the photo has selected previously, we remove it from selectFilePhotoListSubject when user click on photo again
      const newSelectFilePhotoListSubject = selectFilePhotoListSubject.filter(photoObj => Object.keys(photoObj)[0] !== imgKey);
      this.selectFilePhotoListSubject.next(newSelectFilePhotoListSubject)
    }
   
    // 2. show div.image-selected-symbol
    this.imageSelectSymboleHandler(imgKey);

  }

  findFilePhotoByKey(key:string) {

    const filePhotoListSubject = this.filePhotoListSubject.getValue();
    let selectedFilePhoto = {};

    filePhotoListSubject.filter(objPhoto => {
      if ( Object.keys(objPhoto)[0] === key ) {
        selectedFilePhoto = objPhoto;
      }
    });

    return selectedFilePhoto

  }

  photoIsSelected(key:string):boolean {

    const selectFilePhotoListSubject = this.selectFilePhotoListSubject.getValue();
    let result:boolean = false;

    selectFilePhotoListSubject.map(objPhoto => {
      if ( Object.keys(objPhoto)[0] === key ) 
        result = true
      });

    return result
    
  }

  imageSelectSymboleHandler(imgKey:string) {

    const selectedImage = document.getElementById(`${imgKey}`)! as HTMLImageElement;
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

  }

}
