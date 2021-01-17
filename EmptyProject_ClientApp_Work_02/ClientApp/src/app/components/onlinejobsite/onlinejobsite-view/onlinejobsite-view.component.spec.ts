import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinejobsiteViewComponent } from './onlinejobsite-view.component';

describe('OnlinejobsiteViewComponent', () => {
  let component: OnlinejobsiteViewComponent;
  let fixture: ComponentFixture<OnlinejobsiteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinejobsiteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinejobsiteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
