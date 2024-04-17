import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { SpotifyAuthService } from './services/spotify-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'blindtest';

  authenticated: boolean = false;

  private accessToken =
    this.spotifyAuthService.getAccessTokenFromLocalStorage();

  constructor(
    public spotifyService: SpotifyService,
    private spotifyAuthService: SpotifyAuthService
  ) {}

  ngOnInit(): void {}

  // Ses fonctions ont été utilisées pour les tests
  // public getTrack() {
  //   const trackID = '69w5X6uTrOaWM32IetSzvO';

  //   this.spotifyService.getTrack(trackID, this.accessToken)
  //   .subscribe(a => {
  //     console.log(a);
  //   })
  // }

  // public getTracks() {
  //   const albumID = '3CRDbSIZ4r5MsZ0YwxuEkn,2Z8WuEywRWYTKe1NybPQEW';

  //   this.spotifyService.getTracks(albumID, this.accessToken)
  //   .subscribe(a => {
  //     console.log(a);
  //   })
  // }

  // public getArtist() {
  //   const artistID = '6KImCVD70vtIoJWnq6nGn3';
  //   this.spotifyService.getArtist(artistID, this.accessToken)
  //   .subscribe(a => {
  //     console.log(a);
  //   })
  // }

  // public getPlaylist() {
  //   const playlistID = '3mQxm4Se2p4ePgqmQmiNvV';

  //   this.spotifyService.getPlaylist(playlistID, this.accessToken)
  //   .subscribe(a => {
  //     console.log(a);
  //   })
  // }

  // public getPlaylists() {
  //   const userID = '.lucie.';
  //   this.spotifyService.getPlaylists(userID, this.accessToken)
  //   .subscribe(a => {
  //     console.log(a);
  //   })
  // }
}
