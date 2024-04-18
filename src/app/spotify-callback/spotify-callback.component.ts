import { Component } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-spotify-callback',
  templateUrl: './spotify-callback.component.html',
  styleUrl: './spotify-callback.component.css',
})
export class SpotifyCallbackComponent {
  private accessToken: string = '';
  profile: any;

  constructor(
    private router: Router,
    public spotifyService: SpotifyService,
    public spotifyAuthService: SpotifyAuthService
  ) {}

  ngOnInit() {
    this.writeToken();
    this.router.navigateByUrl('/home-game');
  }

  async writeToken() {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      this.accessToken = await this.spotifyAuthService.getAccessToken(code);
    }
  }
}
