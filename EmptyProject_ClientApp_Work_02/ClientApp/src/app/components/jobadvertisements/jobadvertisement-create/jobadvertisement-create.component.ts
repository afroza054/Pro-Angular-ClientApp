import { Component, OnInit } from '@angular/core';
import { JobAdvertisement } from 'src/app/models/jobadvertisement';
import { Onlinejobsite } from 'src/app/models/onlinejobsite';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobadvertisementService } from 'src/app/services/jobadvertisement.service';
import { NotifyService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-jobadvertisement-create',
  templateUrl: './jobadvertisement-create.component.html',
  styleUrls: ['./jobadvertisement-create.component.css'],
  styles: [
    `
    :host {
        display:block;
        width:100%;
    }`
  ]
})
export class JobadvertisementCreateComponent implements OnInit {

  jobadvertisement: JobAdvertisement = new JobAdvertisement();
  onlinejobsites: Onlinejobsite[] = [];
  courseForm: FormGroup = new FormGroup({
    JobAdvertisementName: new FormControl('', Validators.required),
    TypeName: new FormControl('', Validators.required),
    OnlineJobSiteId: new FormControl('', Validators.required)
  })
  constructor(
    private advertisementService: JobadvertisementService,
    private notifyService: NotifyService
  ) { }
  get f() {
    return this.courseForm.controls;
  }
  onSubmit() {
    if (this.courseForm.invalid) return;
    Object.assign(this.jobadvertisement, this.courseForm.value);
    this.advertisementService.insert(this.jobadvertisement)
      .subscribe(x => {
        this.notifyService.message("Data saved to database.", "DISMISS");
        this.courseForm.reset({});
        this.courseForm.markAsUntouched();
        this.courseForm.markAsPristine();
      }, err => {
        console.log(err);

      })
  }
  ngOnInit(): void {
    this.advertisementService.getOnlineOptions()
      .subscribe(x => {
        this.onlinejobsites = x;
      }, err => {
        this.notifyService.message("Cannot load jobsites from remote server.", "DISMISS");
      })
  }

}
