import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Onlinejobsite } from 'src/app/models/onlinejobsite';
import { JobAdvertisement } from 'src/app/models/jobadvertisement';
import { MatTableDataSource } from '@angular/material/table';
import { JobadvertisementService } from 'src/app/services/jobadvertisement.service';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from 'src/app/services/notify.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-jobadvertisement-view',
  templateUrl: './jobadvertisement-view.component.html',
  styleUrls: ['./jobadvertisement-view.component.css']
})
export class JobadvertisementViewComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  jobadvertisements: JobAdvertisement[] = [];
  onlinejobsites: Onlinejobsite[];
  errorMsg: string = null;
  pubDataSource: MatTableDataSource<any>;
  columnList: string[] = ['JobAdvertisementName', 'TypeName', 'OnlineJobSiteId', 'actions'];
  constructor(
    private jobService: JobadvertisementService,
    private notifyService: NotifyService,
    private deleteDialog: MatDialog
  ) { }
  
  getOnlineName(id: number) {
    if (!this.onlinejobsites) return '';
    let n = '';
    for (let d of this.onlinejobsites) {
      if (d.OnlineJobSiteId == id) {
        n = d.OnlineJobSiteName;
        break;
      }
    }
    return n;
  }
  confirmDelete(item: JobAdvertisement) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.jobService.delete(item.OnlineJobSiteId).subscribe(
            x => {
              this.pubDataSource.data = this.pubDataSource.data.filter(data => data.OnlineJobSiteId != item.OnlineJobSiteId);
              this.notifyService.message("Item deleted successfully.", "DISMISS")
            },
            err => {
              this.notifyService.message("Cannot delete item.", "DISMISS");
              return throwError(err);
            }
          )
        }
      }
    )
  }

  confirmDeleteCourse(item: JobAdvertisement) {
    
    console.log(item);
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.jobService.delete(item.OnlineJobSiteId).subscribe(
            x => {
              this.pubDataSource.data = this.pubDataSource.data.filter(data => data.OnlineJobSiteId != item.OnlineJobSiteId);
              this.notifyService.message("Item deleted successfully.", "DISMISS")
            },
            err => {
              this.notifyService.message("Cannot delete item.", "DISMISS");
              return throwError(err);
            }
          )
        }
      }
    )
  }

  ngOnInit(): void {
    this.jobService.getOnlineOptions()
      .subscribe(x => {
        this.onlinejobsites = x;
      }, err => {
        this.errorMsg = "Could not department list data";
        return throwError(err);
      })
    this.jobService.get()
      .subscribe(x => {
        this.jobadvertisements = x;
        this.pubDataSource = new MatTableDataSource(this.jobadvertisements);
        this.pubDataSource.sort = this.sort;
        this.pubDataSource.paginator = this.paginator;
      }, err => {
        this.errorMsg = "Could not fetch data";
        return throwError(err);
      });
  }


}
