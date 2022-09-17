import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiceCardComponent } from './nice-card.component';

describe('NiceCardComponent', () => {
  let component: NiceCardComponent;
  let fixture: ComponentFixture<NiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
