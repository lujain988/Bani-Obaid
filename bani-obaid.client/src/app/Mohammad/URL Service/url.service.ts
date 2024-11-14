import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  staticData = "https://localhost:7243/api";

  getAllJobs(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Jobs/ActiveJobs/${id}`);
  }

  getJobDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Jobs/${id}`);

  }

  getJobs(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Jobs`);
  }

  // function for add a new job
  addJob(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Jobs`, data);
  }

  // function foe edit job
  editJob(id: any, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Jobs/${id}`, formData);
  }

  // function for delete job
  deleteJob(id: any): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Jobs/${id}`);
  }

  // function for edit status of job
  editStatus(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Jobs/ChangeStatus/${id}`);
  }

  // POST method to create a new ownership transfer
  addOwnershipTransfer(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/OwnershipTransfer/api/OwnershipTransfers`, data);
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.staticData}/Events`);
  }

}

