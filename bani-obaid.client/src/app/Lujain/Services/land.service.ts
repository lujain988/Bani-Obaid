import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandService {
  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7243/api";

  getAllLandmarks(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/GeneralLand`);
  }

  getLandmarkById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/GeneralLand/${id}`);
  }

  createLandmark(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/GeneralLand`, data);
  }

  updateLandmark(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/GeneralLand/${id}`, data);
  }

  deleteLandmark(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/GeneralLand/${id}`);
  }
  deleteLandmarkImage(imageId: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/GeneralLand/DeleteImage/${imageId}`);
  }

  showImages(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.staticData}/GeneralLand/showImages/${id}`);
  }
  addAdditionalImages(id: number, additionalImages: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/GeneralLand/AddAdditionalImages/${id}`, additionalImages);
  }


}
