import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'blindtest';
  //accessToken = 'BQBjzmwPDMT99shEkWYKnLPtpkax9JkaONKV3oLMhgG2X8YAfHHoiDs408U4aFk7YF7lWKEaJR7F4ciO9a3BqPEDp_3mJlsS6Pu6Bww7qxAl2tE5VXEjd3BxXU40e6Do_v3az-gQfg0AIfamswfVyRAmTroxhhC7IQPRrZRREFpW7yEQCPGFHz4daVNjgA';
  accessToken = 'BQAR190_hTdeXxhydcGNwYYjxXz4T-OjulTgAswHhF7cXljVVQyCnilZrAMO9afxLemoTHB0nQsUJBJ_aHY0dU_qiU6hcIG1SejbY5IzbUhCNtriSW1_pd0XaNj1ggRPjZeP_tUbTsqnM2Ur-FIYW572Hp6Nqv90n2mGRvOfeSlbVHnOdFSNYp-HqrR0aw';
  constructor (
    public spotifyService: SpotifyService 
  ) {}

  ngOnInit(): void {
      //this.getTrack();
      //this.getPlaylist();
      //this.getPlaylists();
      //this.getArtist();
      this.getTracks();
  }

  public getTrack() {
    const trackID = '69w5X6uTrOaWM32IetSzvO';
    //const accessToken = 'BQBFN8Samwl7t2Qo4SpXuCug4HNY3LsutLEL2VUv1bDLNJ19Lfg0hXl45B_SsOOrvGbMw2Ja4ja_jyTaff0hEfgvZfLgs2b6eiYInFqeLMNzzyIv_bmqGOq3uKWNX9Th2wG60kgqQig_95q25HOcakiPY3ePPV7_6V4WrEyIVpwo50UOSx73wlNR6F7pZw';

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
    //const accessToken = 'BQBFN8Samwl7t2Qo4SpXuCug4HNY3LsutLEL2VUv1bDLNJ19Lfg0hXl45B_SsOOrvGbMw2Ja4ja_jyTaff0hEfgvZfLgs2b6eiYInFqeLMNzzyIv_bmqGOq3uKWNX9Th2wG60kgqQig_95q25HOcakiPY3ePPV7_6V4WrEyIVpwo50UOSx73wlNR6F7pZw';

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

