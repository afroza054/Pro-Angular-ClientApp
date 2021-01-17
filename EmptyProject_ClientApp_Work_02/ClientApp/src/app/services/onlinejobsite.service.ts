import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dataUrl } from '../shared/constants';
import { Onlinejobsite } from '../models/onlinejobsite';
import { JobAdvertisement } from '../models/jobadvertisement';

@Injectable({
  providedIn: 'root'
})
export class OnlinejobsiteService {

  constructor(
    private http: HttpClient
  ) { }
  getWithCourse(): Observable<Onlinejobsite[]> {
    return this.http.get<Onlinejobsite[]>(`${dataUrl}/OnlinejobsiteData/OnlineWithAdvertisement`);
  }
  getWithCourseById(id: number): Observable<Onlinejobsite> {
    return this.http.get<Onlinejobsite>(`${dataUrl}/OnlinejobsiteData/OnlinesWithAdvertisementById/${id}`);
  }
  insert(t: Onlinejobsite): Observable<Onlinejobsite> {
    // console.log(t);
    return this.http.post<Onlinejobsite>(`${dataUrl}/OnlinejobsiteData/InsertOnlinesWithAdvertisement`, t);
  }
  update(t: Onlinejobsite): Observable<Onlinejobsite> {
    return this.http.put<Onlinejobsite>(`${dataUrl}/OnlinejobsiteData/UpdateOnlinesWithAdvertisement/${t.OnlineJobSiteId}`, t);
  }
  delete(id: number): Observable<Onlinejobsite> {
    return this.http.delete<Onlinejobsite>(`${dataUrl}/OnlinejobsiteData/DeleteOnlineJobSite/${id}`);
  }
  
  deleteCourse(id: number): Observable<JobAdvertisement> {
    return this.http.delete<JobAdvertisement>(`${dataUrl}/AdvertisementData/DeleteJobAdvertisement/${id}`);
  }
}
