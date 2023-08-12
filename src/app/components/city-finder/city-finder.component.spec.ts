import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityFinderComponent } from './city-finder.component';

describe('CityFinderComponent', () => {
  let component: CityFinderComponent;
  let fixture: ComponentFixture<CityFinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityFinderComponent]
    });
    fixture = TestBed.createComponent(CityFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
