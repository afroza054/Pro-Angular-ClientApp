import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobadvertisementEditComponent } from './jobadvertisement-edit.component';

describe('JobadvertisementEditComponent', () => {
  let component: JobadvertisementEditComponent;
  let fixture: ComponentFixture<JobadvertisementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobadvertisementEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobadvertisementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
