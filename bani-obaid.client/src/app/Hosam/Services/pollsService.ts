import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7243/api";

  getAllPolls(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Polls`);
  }

  getPollById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Polls/GetPullById/${id}`);
  }

  getPullPercentage(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Polls/GetPollPercentage/${id}`);
  }

  getVotesByPollId(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Polls/GetVotesByPollId/${id}`);
  }

  postVote(id: number, data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Polls/PostVote/${id}`, data);
  }

  addPoll(poll: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Polls/PostPoll`, poll); 
  }

  deletePoll(id: number): Observable<any> {
    return this.http.delete(`${this.staticData}/Polls/DeletePollById/${id}`);
  }

}
