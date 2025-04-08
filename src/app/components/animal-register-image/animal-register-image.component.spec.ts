import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalRegisterImageComponent } from './animal-register-image.component';

describe('AnimalRegisterImageComponent', () => {
  let component: AnimalRegisterImageComponent;
  let fixture: ComponentFixture<AnimalRegisterImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalRegisterImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalRegisterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
