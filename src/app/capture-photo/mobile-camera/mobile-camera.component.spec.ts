import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCameraComponent } from './mobile-camera.component';

describe('MobileCameraComponent', () => {
  let component: MobileCameraComponent;
  let fixture: ComponentFixture<MobileCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
