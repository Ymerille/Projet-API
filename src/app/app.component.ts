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

  constructor (
    public spotifyService: SpotifyService 
  ) {}

  ngOnInit(): void {
      this.getTrack();
  }

  public getTrack() {
    const trackID = '69w5X6uTrOaWM32IetSzvO';
    const accessToken = 'BQBFN8Samwl7t2Qo4SpXuCug4HNY3LsutLEL2VUv1bDLNJ19Lfg0hXl45B_SsOOrvGbMw2Ja4ja_jyTaff0hEfgvZfLgs2b6eiYInFqeLMNzzyIv_bmqGOq3uKWNX9Th2wG60kgqQig_95q25HOcakiPY3ePPV7_6V4WrEyIVpwo50UOSx73wlNR6F7pZw';

    this.spotifyService.getTrack(trackID, accessToken)
    .subscribe(a => {
      console.log(a);
    })
  }
}

