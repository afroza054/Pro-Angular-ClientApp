import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobadvertisementCreateComponent } from './jobadvertisement-create.component';

describe('JobadvertisementCreateComponent', () => {
  let component: JobadvertisementCreateComponent;
  let fixture: ComponentFixture<JobadvertisementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobadvertisementCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobadvertisementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
