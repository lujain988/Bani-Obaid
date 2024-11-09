import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  constructor(private http: HttpClient) { }


  staticData = "https://localhost:7243/api";

  getAllTenders(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Tenders/GetAllTenders`);
  }

  getTendersById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Tenders/GetTendersbyId/${id}`);
  }


  createTender(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Tenders/AddNewTender`, data);
  }

  updateLandmark(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Tenders/UpdateTenders/${id}`, data);
  }

  deleteTender(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Tenders/DeleteTender/${id}`);
  }


}
