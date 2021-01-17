import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinejobsiteEditComponent } from './onlinejobsite-edit.component';

describe('OnlinejobsiteEditComponent', () => {
  let component: OnlinejobsiteEditComponent;
  let fixture: ComponentFixture<OnlinejobsiteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinejobsiteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinejobsiteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
