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
    debugger
    return this.http.post<any>(`${this.staticData}/OwnershipTransfer/OwnershipTransfers`, data);
  }

  // Fetch all ownership transfers
  getAllOwnershipTransfers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.staticData}/OwnershipTransfer`);
  }

  // Delete an ownership transfer by ID
  deleteOwnershipTransfer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.staticData}/OwnershipTransfer/${id}`);
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.staticData}/Events`);
  }

  getEventDetails(id: number): Observable<any> {
    return this.http.get(`${this.staticData}/Events/${id}`);
  }

  registerParticipant(eventId: number, participant: any): Observable<any> {
    return this.http.post(`${this.staticData}/Events/${eventId}/register`, participant);
  }

  // Add new event
  addEvent(event: any): Observable<any> {
    debugger
    return this.http.post<any>(`${this.staticData}/Events`, event);
  }

  // Update existing event
  updateEvent(id: number, event: any): Observable<any> {
    return this.http.put(`${this.staticData}/Events/${id}`, event);
  }

  // Delete an event
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.staticData}/Events/${id}`);
  }

  getAllRegistrations(): Observable<any> {
    return this.http.get(`${this.staticData}/Events/registrations`);
  }

  getRegistrationsByEvent(eventId: number): Observable<any> {
    return this.http.get(`${this.staticData}/Events/registrations/${eventId}`);
  }

  deleteRegistration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.staticData}/Events/registrations/${id}`);
  }

  getEventNames(): Observable<any> {
    return this.http.get(`${this.staticData}/Events/events/names`);
  }

}

