import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spotify } from './spotify';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {
  private apiURL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  getTrack(trackID: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get(`${this.apiURL}/tracks/${trackID}`, {headers});
  }

}
/*
export class SpotifyService {
  constructor(private http: HttpClient) { }

  spotifyKey = "BQC4XyI7b8QKSNc2C1KeyGwojOWuQx95ZLyIcp2b_jKDG7FOGf0XF0R8aJxVwwYngYyOxS1tSpJj9rs46FiYr9RMVXYCv_PI_KANlxxgCGRpuYRr8z0A28yFKKsMMYj96L3udupmra4vreQKs1h1D2ynZDdwCkqniqLxzkPvBVD0uTNhQZaqL4BMowzcaw";
  apiFirstPartURL = "https://api.spotify.com/v1";
  authURL = "https://accounts.spotify.com/authorize";
  scopesArray = ["ugc-image-upload", "user-read-playback-state", "user-modify-playback-state", "user-read-currently-playing",
    "streaming", "app-remote-control", "user-read-email", "user-read-private", "playlist-read-collaborative", "playlist-modify-public", "playlist-read-private",
    "user-library-modify", "user-library-read", "user-top-read", "user-read-playback-position", "user-read-recently-played", "user-follow-read", "user-follow-modify"];

  query_param = {
    client_id: "366f5760f2954c9bbf65f7c89437386a" ,
    response_type: "code",
    redirectUri: "http://127.0.0.1:4200/dashboard/",
    scopes: this.scopesArray.join(" "),
    showDialog: true
  };
  
  Oauth = `${this.authURL}?client_id=${this.query_param.client_id}&redirect_uri=${encodeURIComponent(this.query_param.redirectUri)}&scope=${encodeURIComponent(this.query_param.scopes)}&response_type=token&state=123`;
  
  headers = new HttpHeaders({
    "Authorization": "Bearer" + this.spotifyKey,
    "Accept": "application/json",
    "Content-Type": "application/json"
  });

  setSpotifyKey(key:string) {
    this.spotifyKey = key;
  }

  setHeaders(headers: HttpHeaders) {
    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + this.spotifyKey,
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
  }


  fetchData(endPoint: string, method: string, bodyParam = null) {
    this.setHeaders(this.headers); //the header with the key should be set everytime you do a fetch
    return this.http.request(method, `${this.apiFirstPartURL}/${endPoint}`, {
      headers: this.headers,
      body: bodyParam,
      responseType: 'json'
    });
  }
  
  getTrack(id:string) {
    return this.http.get<Spotify>(this.apiFirstPartURL + 'tracks/' + id);
    //return(this.fetchData(`tracks/${id}`, 'GET'));
  }
}
*/