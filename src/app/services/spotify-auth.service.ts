import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  private clientID: string = '366f5760f2954c9bbf65f7c89437386a';
  private redirectURI: string = 'http://localhost:5173/callback';
  private tokenEndpoint: string = 'https://accounts.spotify.com/api/token';
  private authEndpoint: string = 'https://accounts.spotify.com/authorize';
  private accessTokenKey: string = 'spotify_access_token';
  private scope: string = 'user-read-private user-read-email';

  constructor(private http: HttpClient) {}

  async redirectToAuthCodeFlow(): Promise<void> {
    const verifier = this.generateCodeVerifier(128);
    localStorage.setItem('verifier', verifier);

    const challenge = await this.generateCodeChallenge(verifier);
    const params = new HttpParams()
      .append('client_id', this.clientID)
      .append('response_type', 'code')
      .append('redirect_uri', this.redirectURI)
      .append('scope', 'user-read-private user-read-email')
      .append('code_challenge_method', 'S256')
      .append('code_challenge', challenge);

    window.location.href = `${this.authEndpoint}?${params.toString()}`;
  }

  async getAccessToken(code: string): Promise<any> {
    let verifier = localStorage.getItem('verifier');
    if (!verifier) {
      verifier = ' ';
    }

    const params = new HttpParams()
      .append('client_id', this.clientID)
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', this.redirectURI)
      .append('code_verifier', verifier);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<any>(this.tokenEndpoint, params.toString(), { headers })
      .subscribe(
        (response: any) => {
          console.log(response.access_token);
          const accessToken = response.access_token;
          if (accessToken) {
            this.saveAccessTokenToLocalStorage(accessToken);
          } else {
            console.error('pas de token');
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  private generateCodeVerifier(length: number): string {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async fetchProfile(token: string): Promise<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<any>('https://api.spotify.com/v1/me', { headers });
  }

  saveAccessTokenToLocalStorage(accessToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  public getAccessTokenFromLocalStorage(): string {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    if (accessToken) {
      return accessToken;
    } else {
      return ' ';
    }
  }

  removeAccessTokenFromLocalStorage() {
    localStorage.removeItem(this.accessTokenKey);
  }
}
