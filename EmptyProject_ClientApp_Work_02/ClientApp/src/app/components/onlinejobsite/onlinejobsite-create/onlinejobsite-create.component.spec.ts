import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinejobsiteCreateComponent } from './onlinejobsite-create.component';

describe('OnlinejobsiteCreateComponent', () => {
  let component: OnlinejobsiteCreateComponent;
  let fixture: ComponentFixture<OnlinejobsiteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinejobsiteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinejobsiteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
