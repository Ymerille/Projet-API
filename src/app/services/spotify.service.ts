import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiURL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  getTrack(trackID: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(`${this.apiURL}/tracks/${trackID}`, { headers });
  }

  getTracks(albumID: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(`${this.apiURL}/tracks?ids=${albumID}`, { headers });
  }

  getArtist(artistID: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(`${this.apiURL}/artists/${artistID}`, { headers });
  }

  getPlaylist(playlistID: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(`${this.apiURL}/playlists/${playlistID}`, { headers });
  }

  getPlaylists(userID: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(`${this.apiURL}/users/${userID}/playlists?limit=20`, {
      headers,
    });
  }

  getProfile(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(`${this.apiURL}/me`, { headers });
  }

  getNamePlaylist(playlistID: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(`${this.apiURL}/playlists/${playlistID}?fields=name`, {
      headers,
    });
  }

  getPlaylistLimit(playlistID: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(
      `${this.apiURL}/playlists/${playlistID}/tracks?limit=5&offset=0`,
      { headers }
    );
  }
}
