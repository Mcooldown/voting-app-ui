import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Candidate,
  CandidatesResponse,
  CastVoteRequest,
  CastVoteResponse,
  ResultsResponse,
} from '../models/vote.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private http = inject(HttpClient);

  getCandidates(): Observable<Candidate[]> {
    return this.http
      .get<CandidatesResponse>(`${environment.apiUrl}/votes/candidates`)
      .pipe(map((r) => r.data.candidates));
  }

  castVote(candidateName: string): Observable<CastVoteResponse> {
    const body: CastVoteRequest = { candidate_name: candidateName };
    return this.http.post<CastVoteResponse>(`${environment.apiUrl}/votes`, body);
  }

  getResults(): Observable<ResultsResponse['data']> {
    return this.http
      .get<ResultsResponse>(`${environment.apiUrl}/votes/results`)
      .pipe(map((r) => r.data));
  }
}
