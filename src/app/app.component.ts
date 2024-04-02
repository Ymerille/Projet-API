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
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'blindtest';
  authenticated: boolean = false;
  accessToken: string = 'BQBnGcOihlh9t24BffYnZKmFogvV24ykYfxovGQwU66HT35nU_hJG_g7A0BbydlGoTupoUvvTbKMZ0inFvJKJyxU9KQGATw0wnkl1f4tpFQs_rasgDD2S5MpiIrxdId1-zVCAU0LvmnKLAw1kupQeDmm-36cqAtmuPTVcPZa-P1hv1ljgvQGF-b2EV7_tn7Tcjrt';
  //accessToken: any = '';

  constructor (
    public spotifyService: SpotifyService,
    private spotifyAuthService : SpotifyAuthService
  ) {}

  ngOnInit(): void {
      this.getTrack();
      //this.getPlaylist();
      //this.getPlaylists();
      //this.getArtist();
      //this.getTracks();
      //this.authenticate();
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

