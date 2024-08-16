import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterPageComponent } from './fighter-page.component';

describe('FighterPageComponent', () => {
  let component: FighterPageComponent;
  let fixture: ComponentFixture<FighterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FighterPageComponent]
    });
    fixture = TestBed.createComponent(FighterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
