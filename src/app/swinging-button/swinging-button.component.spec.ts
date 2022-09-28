import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwingingButtonComponent } from './swinging-button.component';

describe('SwingingButtonComponent', () => {
  let component: SwingingButtonComponent;
  let fixture: ComponentFixture<SwingingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwingingButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwingingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
