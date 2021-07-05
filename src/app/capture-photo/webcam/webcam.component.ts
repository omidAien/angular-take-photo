import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit, AfterViewInit {

  @ViewChild("video") public video: ElementRef<HTMLVideoElement>; 
  @ViewChild("canvas") public canvas: ElementRef; 

  Width:number = 680;
  Height:number = 480;

  windowWidth:number = window.screen.width;
  windowHeight:number = window.screen.height;

  hasError:boolean;
  isCaptured:boolean = false;

  constructor() { }

  ngOnInit() {
    this.Width = this.windowWidth - 50;
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

}
