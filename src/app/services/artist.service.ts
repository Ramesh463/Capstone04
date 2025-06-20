import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseUrl = `${environment.apiUrl}/artists`;
  constructor(private http: HttpClient) { }

  findAllArtists(): Observable <Artist[]>{
    return this.http.get<Artist[]>(this.baseUrl);
  }

  findById(id: number): Observable <Artist>{
    return this.http.get<Artist>(`${this.baseUrl}/${id}`);
  }

  create(artist: Artist): Observable <Artist>{
    return this.http.post<Artist>(this.baseUrl, artist);
  }

  update(id: number, artist: Artist): Observable <Artist>{
    return this.http.put<Artist>(`${this.baseUrl}/${id}`, artist);
  }

  delete(id: number): Observable <void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
