import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalRegisterComponent } from './animal-register.component';

describe('AnimalRegisterComponent', () => {
  let component: AnimalRegisterComponent;
  let fixture: ComponentFixture<AnimalRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
