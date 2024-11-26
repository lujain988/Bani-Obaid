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

  getPresidentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.staticData}/president/GetPresidentByID/${id}`);
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

  //MunicipalityMember

  getMember(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/MunicipalityMember/GetAllMembers`);
  }

  addMember(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/MunicipalityMember/addMember`, data);
  }

  editMember(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/MunicipalityMember/updatemember/${id}`, data);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/MunicipalityMember/DeleteMember/${id}`);
  }

  //OrganizationStructure

  getStructure(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/OrganizationStructure/GetStructure`);
  }

  addStructure(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/OrganizationStructure/addStructure`, data);
  }

  editStructure(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/OrganizationStructure/updateStructure/${id}`, data);
  }

  deleteStructure(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/OrganizationStructure/Deletestructure/${id}`);
  }

  //ImageHomePage

  getHomeImage(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/HomePageImage/GetAllHomePageImages`);
  }

  getHomeImageById(id: string): Observable<any> {
    return this.http.get<any>(`${this.staticData}/HomePageImage/GetHomePageImageById/${id}`);
  }

  addHomeImage(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/HomePageImage/AddHomePageImage`, data);
  }

  editHomeImage(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/HomePageImage/UpdateHomePageImage/${id}`, data);
  }

  deleteHomeImage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/HomePageImage/DeleteHomePageImage/${id}`);
  }

  //Partner

  getPartner(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Partner/GetAllPartners`);
  }

  getPartnerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Partner/GetPartnerById/${id}`);
  }

  addPartner(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Partner/AddPartner`, data);
  }

  editPartner(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Partner/UpdatePartner/${id}`, data);
  }

  deletePartner(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Partner/DeletePartner/${id}`);
  }

  //Events

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Events`);
  }

}
