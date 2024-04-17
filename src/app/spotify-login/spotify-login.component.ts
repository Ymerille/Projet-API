import { Component } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrl: './spotify-login.component.css',
})
export class SpotifyLoginComponent {
  profile: any;

  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  async login(): Promise<void> {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) {
      // si aucun code n'est présent dans l'URL, on redirige l'utilisateur vers la page d'authorisation Spotify
      this.spotifyAuthService.redirectToAuthCodeFlow();
    } else {
      const accessToken = await this.spotifyAuthService.getAccessToken(code);
    }
  }
}
