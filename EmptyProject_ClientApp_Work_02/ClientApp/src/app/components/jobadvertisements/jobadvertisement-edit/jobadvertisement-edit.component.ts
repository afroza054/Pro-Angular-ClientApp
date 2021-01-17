import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobAdvertisement } from 'src/app/models/jobadvertisement';
import { Onlinejobsite } from 'src/app/models/onlinejobsite';
import { JobadvertisementService } from 'src/app/services/jobadvertisement.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-jobadvertisement-edit',
  templateUrl: './jobadvertisement-edit.component.html',
  styleUrls: ['./jobadvertisement-edit.component.css'],
  styles: [
    `
    :host {
        display:block;
        width:100%;
    }`
  ]
})
export class JobadvertisementEditComponent implements OnInit {

  jobadvertisement: JobAdvertisement = null;
  onlinejobsites: Onlinejobsite[] = [];
  courseForm: FormGroup = new FormGroup({
    JobAdvertisementName: new FormControl('', Validators.required),
    TypeName: new FormControl('', Validators.required),
    OnlineJobSiteId: new FormControl('', Validators.required)
  })
  constructor(
    private advertiseService: JobadvertisementService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.courseForm.controls;
  }
  onSubmit() {
    if (this.courseForm.invalid) return;
    Object.assign(this.jobadvertisement, this.courseForm.value);
    console.log(this.jobadvertisement);
    this.advertiseService.update(this.jobadvertisement)
      .subscribe(x => {
        this.notifyService.message("Data saved to database.", "DISMISS");
        this.courseForm.reset({});
        this.courseForm.markAsUntouched();
        this.courseForm.markAsPristine();
      }, err => {
        console.log(err);

      })
  }
  initForm() {
    this.courseForm.setValue({
      JobAdvertisementName: this.jobadvertisement.JobAdvertisementName,
      TypeName: this.jobadvertisement.TypeName,
      OnlineJobSiteId: this.jobadvertisement.OnlineJobSiteId
    })
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.advertiseService.getOnlineOptions()
      .subscribe(x => {
        this.onlinejobsites = x;

      }, err => {

      });
    this.advertiseService.getById(id)
      .subscribe(x => {
        this.jobadvertisement = x;
        this.initForm();
      }, err => {

      })
  }

}
