import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobadvertisementViewComponent } from './jobadvertisement-view.component';

describe('JobadvertisementViewComponent', () => {
  let component: JobadvertisementViewComponent;
  let fixture: ComponentFixture<JobadvertisementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobadvertisementViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobadvertisementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
