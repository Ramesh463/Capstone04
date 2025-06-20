import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Track } from '../models/track';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private baseUrl = `${environment.apiUrl}/tracks`;
  constructor(private http: HttpClient) { }

  getAllTrack(): Observable<Track[]>{
    return this.http.get<Track[]>(this.baseUrl);
  }

  getTrackById(id: number): Observable<Track>{
  return this.http.get<Track>(`${this.baseUrl}/${id}`);
  }

 createTrack(track: Track): Observable<Track>{
   return this.http.post<Track>(this.baseUrl, track);
 }

 updateTrack(id: number, track: Track): Observable<Track>{
  return this.http.put<Track>(`${this.baseUrl}/${id}`, track);
 }

 deleteTrack(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
 }
}
