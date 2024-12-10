import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  // private apiUrl = 'https://backvynils-q6yc.onrender.com/albums';
  private apiUrl = 'http://149.56.23.23:3000/albums';

  constructor(private http: HttpClient) {}

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiUrl, album);
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/${id}`);
  }

  updateAlbum(id: number, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/${id}`, album);
  }

  deleteAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addComment(
    albumId: number,
    comment: { description: string; rating: number; collector: { id: number } }
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/${albumId}/comments`, comment);
  }
}
