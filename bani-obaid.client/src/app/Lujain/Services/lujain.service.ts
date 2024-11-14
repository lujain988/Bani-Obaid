import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LujainService {

  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7243/api";

  getAllLandmarks(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/LandMark`);
  }

  getLandmarkById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/LandMark/${id}`);
  }

  createLandmark(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/LandMark`, data);
  }

  updateLandmark(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/LandMark/${id}`, data);
  }

  deleteLandmark(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/LandMark/${id}`);
  }

  deleteLandmarkImage(imageId: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/LandMark/DeleteImage/${imageId}`);
  }
}
