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

  updateTenders(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Tenders/UpdateTenders/${id}`, data);
  }

  deleteTender(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Tenders/DeleteTender/${id}`);
  }

  getAllProjects(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Project/GetAllProjects`);
  }
  getVisibleProjects(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Project/getVisibleProjects`);
  }

  getprojectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Project/GetProjectbyId/${id}`);
  }


  createProject(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Project/addProject`, data);
  }

  updateProject(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Project/updateProject/${id}`, data);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Project/daleteproject/${id}`);
  }
  getAllinvestents(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Investment/GetAllInvestment`);
  }

  getinvestmentsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Investment/GetInvestmentById/${id}`);
  }

  createinvestment(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Investment/addInvestment`, data);
  }

  updateinvestment(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Investment/updateInvestment/${id}`, data);
  }

  deleteinvestment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Investment/DeleteInvestment/${id}`);
  }
  AddSuggest(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Suggest/AddNewSuggestion`, data);

  }
  getAllSuggestion(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Suggest/GetAllSuggestion`);
  }
  deletesuggest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Suggest/Deletesuggestion/${id}`);
  }

  getsuggestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Suggest/GetSuggestionbyId/${id}`);
  }

}
