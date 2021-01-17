import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { JobAdvertisement } from 'src/app/models/jobadvertisement';
import { Onlinejobsite } from 'src/app/models/onlinejobsite';
import { OnlinejobsiteService } from 'src/app/services/onlinejobsite.service';
import { throwError } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-onlinejobsite-view',
  templateUrl: './onlinejobsite-view.component.html',
  styleUrls: ['./onlinejobsite-view.component.css'],
  styles: [
    `
    :host {
        display:block;
        width:100%;
    }`
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OnlinejobsiteViewComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<JobAdvertisement>>;
  @ViewChild(MatPaginator, { static: false }) paginator;
  //set paginator(value: MatPaginator) {
  //  this.dataSource.paginator = value;
  //}
  //dataSource: MatTableDataSource<User>; //
  dataSource: MatTableDataSource<Onlinejobsite>;
  //usersData: User[] = []; //
  onlinesData: Onlinejobsite[] = [];
  columnsToDisplay = ['select', 'OnlineJobSiteName', 'StartedJourney', 'Web', 'Response', 'actions']; //['select', 'name', 'email', 'phone', 'actions'];
  innerDisplayedColumns = ['JobAdvertisementName', 'TypeName', 'actions']; //['street', 'zipCode', 'city', 'actions']; //
  expandedElement: Onlinejobsite | null; //User | null; //
  constructor(
    private onlineService: OnlinejobsiteService,
    private notifyService: NotifyService,
    private deleteDialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }
  initTable(data:Onlinejobsite[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  confirmDelete(item: Onlinejobsite) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.onlineService.delete(item.OnlineJobSiteId)
            .subscribe(x => {
              this.dataSource.data = this.dataSource.data.filter(data => data.OnlineJobSiteId != item.OnlineJobSiteId);
              this.notifyService.message("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }
  confirmDeleteCourse(item: JobAdvertisement) {
    console.log(this.expandedElement);
    console.log(item);
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.onlineService.deleteCourse(item.JobAdvertisementId)
            .subscribe(x => {
              let ds = this.expandedElement.JobAdvertisements as MatTableDataSource<JobAdvertisement>;
              ds.data = ds.data.filter(data => data.JobAdvertisementId != item.JobAdvertisementId);
              this.notifyService.message("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }
  ngOnInit() {
    
    this.onlineService.getWithCourse()
      .subscribe(x => {
        this.onlinesData = x;
        //USERS.forEach(user => {
        //  if (user.addresses && Array.isArray(user.addresses) && user.addresses.length) {
        //    this.usersData = [...this.usersData, { ...user, addresses: new MatTableDataSource(user.addresses) }];
        //  } else {
        //    this.usersData = [...this.usersData, user];
        //  }
        //});
        this.onlinesData.forEach(onlinejobsite => {
          if ((onlinejobsite.JobAdvertisements as JobAdvertisement[]).length == 0) onlinejobsite.JobAdvertisements = null;
          if (onlinejobsite.JobAdvertisements && Array.isArray(onlinejobsite.JobAdvertisements) && onlinejobsite.JobAdvertisements.length) {
            onlinejobsite.JobAdvertisements = new MatTableDataSource(onlinejobsite.JobAdvertisements);
          }
        });
        console.log(this.onlinesData);
        this.initTable(this.onlinesData);



      }, err => {
        console.log(err);
        return throwError(err);
      })

  }

  toggleRow(element: Onlinejobsite) {
    element.JobAdvertisements && (element.JobAdvertisements as MatTableDataSource<JobAdvertisement>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<JobAdvertisement>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    //this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).filter = filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }


}
