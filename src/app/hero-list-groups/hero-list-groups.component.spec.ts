import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListGroupsComponent } from './hero-list-groups.component';

describe('HeroListGroupsComponent', () => {
  let component: HeroListGroupsComponent;
  let fixture: ComponentFixture<HeroListGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroListGroupsComponent]
    });
    fixture = TestBed.createComponent(HeroListGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
