import { Component, OnInit } from '@angular/core';
import { Onlinejobsite } from 'src/app/models/onlinejobsite';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { JobAdvertisement } from 'src/app/models/jobadvertisement';
import { NotifyService } from 'src/app/services/notify.service';
import { OnlinejobsiteService } from 'src/app/services/onlinejobsite.service';
import { throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-onlinejobsite-create',
  templateUrl: './onlinejobsite-create.component.html',
  styleUrls: ['./onlinejobsite-create.component.css'],
  styles: [
    `
    :host {
        display:block;
        width:100%;
    }`
  ]
})
export class OnlinejobsiteCreateComponent implements OnInit {

  onlinejobsite: Onlinejobsite = new Onlinejobsite();
  tradeForm: FormGroup = new FormGroup({
    OnlineJobSiteName: new FormControl('', Validators.required),
    StartedJourney: new FormControl('', Validators.required),
    Web: new FormControl('', Validators.required),
    Response: new FormControl(''),
    
    JobAdvertisements: new FormArray([])
  });
  removeItem(index: number) {
    (this.onlinejobsite.JobAdvertisements as JobAdvertisement[]).splice(index, 1);
  }
  onSubmit() {
    console.log(this.isDisabled);
    if (this.tradeForm.controls.OnlineJobSiteName.invalid ||
      this.tradeForm.controls.StartedJourney.invalid ||
      this.tradeForm.controls.Web.invalid
    )
    {
      this.notifyService.message("Errors in form", 'DISMISS')
      return;
    }
    if ((this.onlinejobsite.JobAdvertisements as JobAdvertisement[]).length == 0)
    
    {
      this.notifyService.message("No advertise added.", 'DISMISS')
      return;
    }
    
    this.onlinejobsite.OnlineJobSiteName = this.tradeForm.controls.OnlineJobSiteName.value;
    this.onlinejobsite.StartedJourney = this.tradeForm.controls.StartedJourney.value;
    this.onlinejobsite.StartedJourney = this.datePipe.transform(this.onlinejobsite.StartedJourney, 'yyyy-MM-dd');
    this.onlinejobsite.Web = this.tradeForm.controls.Web.value;
    this.onlinejobsite.Response = this.tradeForm.controls.Response.value;

    
    this.onlinejobsite.OnlineJobSiteId = 0;
    console.log(this.onlinejobsite);

    this.onlineService.insert(this.onlinejobsite)
      .subscribe(x => {
        this.notifyService.message("Data Saved successfully", 'DISMISS');
        this.tradeForm.reset({});
        this.tradeForm.markAsUntouched();
        this.tradeForm.markAsPristine();
        this.onlinejobsite = new Onlinejobsite();
        this.onlinejobsite.JobAdvertisements = [];
      }, err => {
        this.notifyService.message("Could not insert data.", 'DISMISS');
        return throwError(err);
      })
  }
  addCourseForm() {
    (this.tradeForm.get('JobAdvertisements') as FormArray).push(
      new FormGroup({
        JobAdvertisementName: new FormControl('', Validators.required),
        TypeName: new FormControl('', Validators.required)
      }));
  }
  addCourseToTrade() {
    console.log(this.CourseArray.controls[0].value);
    let jobadvertisement = new JobAdvertisement();
    Object.assign(jobadvertisement, this.CourseArray.controls[0].value);
    (this.onlinejobsite.JobAdvertisements as JobAdvertisement[]).push(jobadvertisement);
    this.CourseArray.controls[0].reset({});
    this.CourseArray.controls[0].markAsPristine();
    this.CourseArray.controls[0].markAsUntouched();
  }
  get CourseArray() {
    return this.tradeForm.get("JobAdvertisements") as FormArray;
  }
  get courseLength() {
    return (this.onlinejobsite.JobAdvertisements ? (this.onlinejobsite.JobAdvertisements as JobAdvertisement[]).length : 0)
  }
  get isDisabled() {
    return this.tradeForm.controls.OnlineJobSiteName.invalid ||
      this.tradeForm.controls.StartedJourney.invalid ||
      this.tradeForm.controls.Web.invalid || (this.onlinejobsite.JobAdvertisements as JobAdvertisement[]).length == 0;
  }
  constructor(
    private onlineService: OnlinejobsiteService,
    private notifyService: NotifyService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.onlinejobsite.JobAdvertisements = [];
    this.addCourseForm();
  }

}
