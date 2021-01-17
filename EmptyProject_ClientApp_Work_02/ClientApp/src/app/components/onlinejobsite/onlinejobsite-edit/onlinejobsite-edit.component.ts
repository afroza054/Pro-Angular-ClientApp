import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Onlinejobsite } from 'src/app/models/onlinejobsite';
import { NotifyService } from 'src/app/services/notify.service';
import { ActivatedRoute } from '@angular/router';
import { OnlinejobsiteService } from 'src/app/services/onlinejobsite.service';
import { JobAdvertisement } from 'src/app/models/jobadvertisement';
import { DatePipe } from '@angular/common';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-onlinejobsite-edit',
  templateUrl: './onlinejobsite-edit.component.html',
  styleUrls: ['./onlinejobsite-edit.component.css'],
  styles: [
    `
    :host {
        display:block;
        width:100%;
    }`
  ]
})
export class OnlinejobsiteEditComponent implements OnInit {

  onlinejobsite: Onlinejobsite = null;
  tradeForm: FormGroup = new FormGroup({
    OnlineJobSiteName: new FormControl('', Validators.required),
    StartedJourney: new FormControl('', Validators.required),
    Web: new FormControl('', Validators.required),
    Response: new FormControl(''),
   
    JobAdvertisements: new FormArray([]),
    NewJobAdvertisements: new FormArray([])
  });
  removeItem(index: number) {
    (this.onlinejobsite.JobAdvertisements as JobAdvertisement[]).splice(index, 1);
  }
  onSubmit() {
    if (this.tradeForm.controls.OnlineJobSiteName.invalid ||
      this.tradeForm.controls.StartedJourney.invalid ||
      this.tradeForm.controls.Web.invalid ||
      (this.onlinejobsite.JobAdvertisements as JobAdvertisement[]).length == 0
    ) return;
    this.onlinejobsite.OnlineJobSiteName = this.tradeForm.controls.OnlineJobSiteName.value;
    this.onlinejobsite.StartedJourney = this.tradeForm.controls.StartedJourney.value;
    this.onlinejobsite.StartedJourney = this.datePipe.transform(this.onlinejobsite.StartedJourney, 'yyyy-MM-dd');
    this.onlinejobsite.Web = this.tradeForm.controls.Web.value;
    this.onlinejobsite.Response = this.tradeForm.controls.Response.value;
    let i = 0;
    for (let x of this.CourseArray.controls) {
      console.log();
      (this.onlinejobsite.JobAdvertisements as JobAdvertisement[])[i].TypeName = x.get("TypeName").value;
      (this.onlinejobsite.JobAdvertisements as JobAdvertisement[])[i].JobAdvertisementName = x.get("JobAdvertisementName").value;
      i++;

    }

    

    this.onlineService.update(this.onlinejobsite)
      .subscribe(x => {
        this.notifyService.message("Data Saved successfully", 'DISMISS');

        this.tradeForm.markAsUntouched();
        this.tradeForm.markAsPristine();
        this.onlinejobsite = new Onlinejobsite();


      }, err => {
        this.notifyService.message("Could not insert data.", 'DISMISS');
        return throwError(err);
      })
  }
  addCourseForm() {
    (this.tradeForm.get('NewJobAdvertisements') as FormArray).push(
      new FormGroup({
        JobAdvertisementName: new FormControl('', Validators.required),
        TypeName: new FormControl('', Validators.required)
      }));
  }
  addCourseToTrade() {
    console.log(this.NewCourseArray.controls[0].value);
    let jobadvertisement = new JobAdvertisement();
    Object.assign(jobadvertisement, this.NewCourseArray.controls[0].value);
    (this.onlinejobsite.JobAdvertisements as JobAdvertisement[]).push(jobadvertisement);
    (this.tradeForm.get('JobAdvertisements') as FormArray).push(
      new FormGroup({
        JobAdvertisementName: new FormControl(jobadvertisement.JobAdvertisementName, Validators.required),
        TypeName: new FormControl(jobadvertisement.TypeName, Validators.required)
      }));
    this.NewCourseArray.controls[0].reset({});
    this.NewCourseArray.controls[0].markAsPristine();
    this.NewCourseArray.controls[0].markAsUntouched();
  }
  get CourseArray() {
    return this.tradeForm.get("JobAdvertisements") as FormArray;
  }
  get NewCourseArray() {
    return this.tradeForm.get("NewJobAdvertisements") as FormArray;
  }
  initForm() {
    this.tradeForm.setValue({
      OnlineJobSiteName: this.onlinejobsite.OnlineJobSiteName,
      StartedJourney: this.onlinejobsite.StartedJourney,
      Web: this.onlinejobsite.Web,
      Response: this.onlinejobsite.Response,
      
      JobAdvertisements: [],
      NewJobAdvertisements: []
    });
    for (let x of this.onlinejobsite.JobAdvertisements as JobAdvertisement[]) {
      (this.tradeForm.get('JobAdvertisements') as FormArray).push(
        new FormGroup({
          JobAdvertisementName: new FormControl(x.JobAdvertisementName, Validators.required),
          TypeName: new FormControl(x.TypeName, Validators.required)
        }));
    }
    this.addCourseForm();
  }
  removeCourseItem(index: number) {
    this.CourseArray.removeAt(index);
  }
  constructor(
    private onlineService: OnlinejobsiteService,
    private notifyService: NotifyService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    this.onlineService.getWithCourseById(id)
      .subscribe(x => {
        console.log(x);
        this.onlinejobsite = x;
        this.initForm();
      }, err => {
        this.notifyService.message("Failed to fetch trade data.", 'DISMISS');
        return throwError(err);
      })

  }


}
