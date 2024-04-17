import { Component, Inject, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.component.html',
  styleUrl: './home-game.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class HomeGameComponent {
  constructor(
    private router: Router,
    public playlistService: PlaylistService
  ) {}

  ngOnInit() {}

  submitPlaylistURL(playlistURL: string) {
    // on envoie l'URL écrite dans un service de la Playlist pour pouvoir la jouer
    this.playlistService.setPlaylistURL(playlistURL);
    this.router.navigateByUrl('/game');
  }
}
