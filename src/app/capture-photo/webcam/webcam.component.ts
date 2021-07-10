import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { noop, of } from 'rxjs';

@Component({
  selector: 'webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit, AfterViewInit {

  @ViewChild("video") public video: ElementRef; 
  @ViewChild("canvas") public canvas: ElementRef; 

  Width:number = 680;
  Height:number = 480;

  windowWidth:number = window.screen.width;
  windowHeight:number = window.screen.height;

  hasError:boolean;
  isCaptured:boolean = false;
  photos: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.setupDevice();
  }

  async setupDevice() {

    if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if ( stream ) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.hasError = false;
        }
        else {
          this.hasError = true;
        }
        
      } catch (error) {
        this.hasError = true;
        console.log(error)
      }

    }

  }

  takePhoto() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.photos.push(this.canvas.nativeElement.toDataURL("image/png"));
    console.log(this.canvas.nativeElement.toDataURL("image/png"))
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.photos[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image:any) {
    this.canvas.nativeElement.getContext('2d').drawImage(image, 0, 0, this.Width, this.Height);
  }

}


