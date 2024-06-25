import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Top3PredictorsComponent } from './top-3-predictors.component';

describe('Top3PredictorsComponent', () => {
  let component: Top3PredictorsComponent;
  let fixture: ComponentFixture<Top3PredictorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Top3PredictorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Top3PredictorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
