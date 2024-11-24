import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  staticData = "https://localhost:7243/api"; 

  constructor(private http: HttpClient) { }

  // Municipality

  getMunicipality(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/about_municipality/GetMunicipality`);
  }

  getMunicipalityById(id: string): Observable<any> {
    return this.http.get<any>(`${this.staticData}/about_municipality/GetMunicipalityByID/${id}`);
  }


  addMunicipality(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/about_municipality/addMunicipality`, data);
  }

  editMunicipality(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/about_municipality/updateMunicipality/${id}`, data);
  }

  deleteMunicipality(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/about_municipality/DeleteMunicipality/${id}`);
  }

  // President

  getPresident(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/president/GetPresident`);
  }

  addPresident(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/president/addPresident`, data);
  }

  editPresident(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/president/updatePresident/${id}`, data);
  }

  deletePresident(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/president/DeletePresident/${id}`);
  }
}
