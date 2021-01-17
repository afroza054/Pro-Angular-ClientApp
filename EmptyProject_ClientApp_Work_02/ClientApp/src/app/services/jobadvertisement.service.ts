import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobAdvertisement } from '../models/jobadvertisement';
import { Onlinejobsite } from '../models/onlinejobsite';
import { dataUrl } from '../shared/constants';
@Injectable({
  providedIn: 'root'
})
export class JobadvertisementService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<JobAdvertisement[]> {
    return this.http.get<JobAdvertisement[]>(`${dataUrl}/AdvertisementData/GetJobAdvertisements`);
  }
  getById(id: number): Observable<JobAdvertisement> {
    return this.http.get<JobAdvertisement>(`${dataUrl}/AdvertisementData/GetJobAdvertisementById/${id}`);
  }
  
  getOnlineOptions(): Observable<Onlinejobsite[]> {
    return this.http.get<Onlinejobsite[]>(`${dataUrl}/AdvertisementData/GetOnlineJobSitesForDropDown`);
  }
  insert(c: JobAdvertisement): Observable<JobAdvertisement> {
    return this.http.post<JobAdvertisement>(`${dataUrl}/AdvertisementData/InsertJobAdvertisement`, c);
  }
  update(c: JobAdvertisement): Observable<JobAdvertisement> {
    return this.http.put<JobAdvertisement>(`${dataUrl}/AdvertisementData/UpdateJobAdvertisement/${c.JobAdvertisementId}`, c);
  }
  delete(id: number): Observable<JobAdvertisement> {
    return this.http.delete<JobAdvertisement>(`${dataUrl}/AdvertisementData/DeleteJobAdvertisement/${id}`);
  }
  deleteOnline(id: number): Observable<Onlinejobsite> {
    return this.http.delete<Onlinejobsite>(`${dataUrl}/OnlinejobsiteData/DeleteOnlineJobSite/${id}`);
  }
  deleteCourse(id: number): Observable<JobAdvertisement> {
    return this.http.delete<JobAdvertisement>(`${dataUrl}/AdvertisementData/DeleteJobAdvertisement/${id}`);
  }
}

