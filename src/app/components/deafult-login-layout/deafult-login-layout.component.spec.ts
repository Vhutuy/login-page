import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeafultLoginLayoutComponent } from './deafult-login-layout.component';

describe('DeafultLoginLayoutComponent', () => {
  let component: DeafultLoginLayoutComponent;
  let fixture: ComponentFixture<DeafultLoginLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeafultLoginLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeafultLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
