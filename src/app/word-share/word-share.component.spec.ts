import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordShareComponent } from './word-share.component';

describe('WordShareComponent', () => {
  let component: WordShareComponent;
  let fixture: ComponentFixture<WordShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
