import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotTeamComponent } from './not-team.component';

describe('NotTeamComponent', () => {
  let component: NotTeamComponent;
  let fixture: ComponentFixture<NotTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotTeamComponent]
    });
    fixture = TestBed.createComponent(NotTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
