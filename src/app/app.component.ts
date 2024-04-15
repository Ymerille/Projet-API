import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SpotifyService } from './spotify.service';
import { SpotifyAuthService } from './spotify-auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'blindtest';
  
  authenticated: boolean = false;
  //accessToken: any = '';

  private accessToken = this.spotifyAuthService.getAccessTokenFromLocalStorage();

  constructor (
    public spotifyService: SpotifyService,
    private spotifyAuthService : SpotifyAuthService,
  ) {}

  ngOnInit(): void {
      //console.log(this.accessToken);
      //this.getTrack();
      this.getPlaylist();
      //this.getPlaylists();
      //this.getArtist();
      //this.getTracks();
      //this.authenticate();
      this.spotifyService.getProfile(this.accessToken);
  }

  // async authenticate(): Promise<void> {
  //   const params = new URLSearchParams(window.location.search);
  //   const code = params.get("code");

  //   if (!code) {
  //     this.spotifyAuthService.redirectToAuthCodeFlow();
  //   }
  //   else {
  //     try {
  //       this.accessToken = await this.spotifyAuthService.getAccessToken(code);
  //       this.authenticated = true;
  //     } catch (error) {
  //       console.log("Erreur lors de l'authentification et la récupération du token");
  //     }
  //   }
  // }

  public getTrack() {
    const trackID = '69w5X6uTrOaWM32IetSzvO';
    
    this.spotifyService.getTrack(trackID, this.accessToken)
    .subscribe(a => {
      console.log(a);
    })
  }

  public getTracks() {
    const albumID = '3CRDbSIZ4r5MsZ0YwxuEkn,2Z8WuEywRWYTKe1NybPQEW';

    this.spotifyService.getTracks(albumID, this.accessToken)
    .subscribe(a => {
      console.log(a);
    })
  }

  public getArtist() {
    const artistID = '6KImCVD70vtIoJWnq6nGn3';
    this.spotifyService.getArtist(artistID, this.accessToken)
    .subscribe(a => {
      console.log(a);
    })
  }

  public getPlaylist() {
    const playlistID = '3mQxm4Se2p4ePgqmQmiNvV';
   
    this.spotifyService.getPlaylist(playlistID, this.accessToken)
    .subscribe(a => {
      console.log(a);
    })
  }

  public getPlaylists() {
    const userID = '.lucie.';
    this.spotifyService.getPlaylists(userID, this.accessToken)
    .subscribe(a => {
      console.log(a);
    })
  }

}

