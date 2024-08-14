import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberIconSelectorComponent } from './member-icon-selector.component';

describe('MemberIconSelectorComponent', () => {
  let component: MemberIconSelectorComponent;
  let fixture: ComponentFixture<MemberIconSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberIconSelectorComponent]
    });
    fixture = TestBed.createComponent(MemberIconSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
