import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComplainComponent } from './register-complain.component';

describe('RegisterComplainComponent', () => {
  let component: RegisterComplainComponent;
  let fixture: ComponentFixture<RegisterComplainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComplainComponent]
    });
    fixture = TestBed.createComponent(RegisterComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
