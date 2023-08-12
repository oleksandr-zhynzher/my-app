import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsListComponent } from './complaints-list.component';

describe('ComplaintsListComponent', () => {
  let component: ComplaintsListComponent;
  let fixture: ComponentFixture<ComplaintsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintsListComponent]
    });
    fixture = TestBed.createComponent(ComplaintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
