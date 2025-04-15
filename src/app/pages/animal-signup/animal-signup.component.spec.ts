import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalViewComponent } from './animal-signup.component';

describe('AnimalViewComponent', () => {
  let component: AnimalViewComponent;
  let fixture: ComponentFixture<AnimalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
