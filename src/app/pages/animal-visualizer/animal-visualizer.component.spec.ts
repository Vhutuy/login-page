import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalVisualizerComponent } from './animal-visualizer.component';

describe('AnimalVisualizerComponent', () => {
  let component: AnimalVisualizerComponent;
  let fixture: ComponentFixture<AnimalVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalVisualizerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
