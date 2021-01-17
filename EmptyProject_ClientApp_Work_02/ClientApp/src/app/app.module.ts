import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { HomeComponent } from './components/home/home.component';

import { MatImportsModule } from './shared/mat-imports/mat-imports.module';
import { JobadvertisementViewComponent } from './components/jobadvertisements/jobadvertisement-view/jobadvertisement-view.component';
import { JobadvertisementCreateComponent } from './components/jobadvertisements/jobadvertisement-create/jobadvertisement-create.component';
import { OnlinejobsiteService } from './services/onlinejobsite.service';
import { JobadvertisementService } from './services/jobadvertisement.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifyService } from './services/notify.service';
import { OnlinejobsiteViewComponent } from './components/onlinejobsite/onlinejobsite-view/onlinejobsite-view.component';
import { OnlinejobsiteCreateComponent } from './components/onlinejobsite/onlinejobsite-create/onlinejobsite-create.component';
import { OnlinejobsiteEditComponent } from './components/onlinejobsite/onlinejobsite-edit/onlinejobsite-edit.component';
import { JobadvertisementEditComponent } from './components/jobadvertisements/jobadvertisement-edit/jobadvertisement-edit.component';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobadvertisementViewComponent,
    JobadvertisementCreateComponent,
    AppNavComponent,
    DeleteDialogComponent,
    OnlinejobsiteViewComponent,
    OnlinejobsiteCreateComponent,
    OnlinejobsiteEditComponent,
    JobadvertisementEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatImportsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,

    
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    
   
    
  
    
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [OnlinejobsiteService, JobadvertisementService, NotifyService, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
