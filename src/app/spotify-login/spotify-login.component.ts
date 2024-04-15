import { Component } from '@angular/core';
import { SpotifyAuthService } from '../spotify-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrl: './spotify-login.component.css'
})
export class SpotifyLoginComponent {
  profile: any;

  constructor(private spotifyAuthService: SpotifyAuthService,
              private router: Router,
  ) {}

  ngOnInit() {
  }

  async login(): Promise<void> {
    const code = new URLSearchParams(window.location.search).get('code');
    if(!code) {
      this.spotifyAuthService.redirectToAuthCodeFlow();
    }
    else {
      const accessToken = await this.spotifyAuthService.getAccessToken(code);
      await this.fetchProfile(accessToken);
    }
  }

  async fetchProfile(token: string): Promise<void> {
    this.profile = await this.spotifyAuthService.fetchProfile(token);
  }
  /*constructor(
    private route: ActivatedRoute,
    private authService: SpotifyAuthService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.getAccessToken(code).subscribe(response => {
          const accessToken = response['access_token'];
          if (accessToken) {
            this.authService.saveAccessTokenToLocalStorage(accessToken);
          }
          else {
            console.error('Access token not found')
          }
        })
      }
  })

  }

  loginWithSpotify() {
    this.authService.login();
  }
*/
}
