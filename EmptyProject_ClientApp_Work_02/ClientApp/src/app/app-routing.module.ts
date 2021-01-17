import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JobadvertisementViewComponent } from './components/jobadvertisements/jobadvertisement-view/jobadvertisement-view.component';
import { JobadvertisementCreateComponent } from './components/jobadvertisements/jobadvertisement-create/jobadvertisement-create.component';
import { OnlinejobsiteViewComponent } from './components/onlinejobsite/onlinejobsite-view/onlinejobsite-view.component';
import { OnlinejobsiteCreateComponent } from './components/onlinejobsite/onlinejobsite-create/onlinejobsite-create.component';
import { OnlinejobsiteEditComponent } from './components/onlinejobsite/onlinejobsite-edit/onlinejobsite-edit.component';
import { JobadvertisementEditComponent } from './components/jobadvertisements/jobadvertisement-edit/jobadvertisement-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jobadvertisements', component: JobadvertisementViewComponent },
  { path: 'createAdvertisement', component: JobadvertisementCreateComponent },
  { path: 'editAdvertisement/:id', component: JobadvertisementEditComponent },

  { path: 'onlinejobsite', component: OnlinejobsiteViewComponent },
  { path: 'createOnline', component: OnlinejobsiteCreateComponent },
  { path: 'editOnline/:id', component: OnlinejobsiteEditComponent }
  
  








  //{ path: 'employee-create', component: EmployeeCreateComponent },
  //{ path: 'employee-edit/:id', component: EmployeeEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
