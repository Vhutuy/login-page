import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalSignupComponent } from './animal-signup.component';

describe('AnimalViewComponent', () => {
  let component: AnimalSignupComponent;
  let fixture: ComponentFixture<AnimalSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
