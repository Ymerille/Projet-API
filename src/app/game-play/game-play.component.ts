import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { SpotifyService } from '../services/spotify.service';
import { SpotifyAuthService } from '../services/spotify-auth.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.css',
})
export class GamePlayComponent implements OnInit {
  private accessToken =
    this.spotifyAuthService.getAccessTokenFromLocalStorage();
  public input_song: string = '';
  public input_artist: string = '';
  currentTrackIndex: number = 0;
  trackURL: string = '';
  score: number = 0;
  total_tracks: number = 0;

  constructor(
    private spotifyService: SpotifyService,
    private playlistService: PlaylistService,
    private spotifyAuthService: SpotifyAuthService
  ) {}

  ngOnInit(): void {
    this.loadAndPlayNextTrack();
  }

  //cette fonction permet de charger l'audio et de le lire. On appelle également la vérification du texte dans cette fonction
  public loadAndPlayNextTrack() {
    //on autorise l'audio à être nul pour la fin de partie
    const audioPlayer = document.getElementById(
      'audioPlayer'
    ) as HTMLAudioElement | null;

    //on effectue les requêtes pour accéder aux données de la playlist choisie
    const playlistURL = this.playlistService.getPlaylistURL();
    console.log(playlistURL);

    const playlistID = this.playlistService.getPlaylistID(playlistURL);
    console.log(playlistID);

    this.spotifyService
      .getPlaylist(playlistID, this.accessToken)
      .subscribe((data) => {
        console.log(data);
        //une partie est composée de 5 chansons
        if (this.total_tracks <= 5) {
          const trackURL =
            data.tracks.items[this.currentTrackIndex].track.preview_url;

          if (audioPlayer) {
            audioPlayer.setAttribute('src', trackURL);
          }

          this.VerifText();
        } //lorsqu'on arrive à la fin du jeu, on indique que l'audio player ne doit plus jouer et on appelle la fonction
        else if (this.total_tracks == 6) {
          if (audioPlayer) {
            audioPlayer.src = '';
          }
          this.gameEnd();
        }
        this.total_tracks++;
      });
  }

  //fonction qui permet d'incrémenter l'indice des chansons, c'est le moment où nous avons fini le traitement d'une chanson
  public indice() {
    this.currentTrackIndex++;
  }

  //cette fonction sert à vérifier si le titre et l'artiste entré par l'utilisateur sont corrects. Un envoi de message sera envoyé selon les résultats
  public VerifText() {
    //appel du service playlistService
    const playlistURL = this.playlistService.getPlaylistURL();
    const playlistID = this.playlistService.getPlaylistID(playlistURL);

    this.spotifyService
      .getPlaylist(playlistID, this.accessToken)
      .subscribe((data) => {
        console.log(data);

        //cas de la chanson de l'indice 0 qui doit être traité à part
        if (this.currentTrackIndex === 0) {
          const currentTrack = data.tracks.items[0].track;
          const trackName = currentTrack.name.toLowerCase();
          const artistNames = currentTrack.artists.map((artist: any) =>
            artist.name.toLowerCase()
          );

          // Vérification si à la fois le titre et l'artiste sont corrects
          if (
            trackName.includes(this.input_song.toLowerCase()) &&
            artistNames.includes(this.input_artist.toLowerCase()) &&
            this.input_song.toLowerCase() != '' &&
            this.input_artist.toLowerCase() != ''
          ) {
            this.score += 2;
            console.log('Les deux sont corrects : ' + this.score);
            this.updateScoreText(this.score, 'Les deux sont corrects');
          } else {
            // Vérification si seulement le titre est correct
            if (
              trackName.includes(this.input_song.toLowerCase()) &&
              this.input_song.toLowerCase() != ''
            ) {
              this.score += 1;
              console.log('Seul le titre est correct : ' + this.score);
              this.updateScoreText(this.score, 'Seul le titre est correct !');
            }

            // Vérification si seulement l'artiste est correct
            else if (
              artistNames.includes(this.input_artist.toLowerCase()) &&
              this.input_artist.toLowerCase() != ''
            ) {
              this.score += 1;
              console.log("Seul l'artiste est correct : " + this.score);
              this.updateScoreText(this.score, "Seul l'artiste est correct !");
            }
            //affichage de la réponse
            else {
              this.updateScoreText(
                this.score,
                "L'artiste et le titre sont faux !"
              );
            }

            this.artiste_song_correcte(artistNames, trackName);
          }
        } else {
          // Vérification pour les pistes suivantes (currentIndex > 0)
          const currentTrack =
            data.tracks.items[this.currentTrackIndex - 1].track;
          const trackName = currentTrack.name.toLowerCase();
          const artistNames = currentTrack.artists.map((artist: any) =>
            artist.name.toLowerCase()
          );

          // Vérification si à la fois le titre et l'artiste sont corrects
          if (
            trackName.includes(this.input_song.toLowerCase()) &&
            artistNames.includes(this.input_artist.toLowerCase()) &&
            this.input_song.toLowerCase() != '' &&
            this.input_artist.toLowerCase() != ''
          ) {
            this.score += 2;
            console.log('Les deux sont corrects : ' + this.score);
            this.updateScoreText(this.score, 'Les deux sont corrects !');
            this.artiste_song_correcte(artistNames,trackName);
          } else {
            // Vérification si seulement le titre est correct
            if (
              trackName.includes(this.input_song.toLowerCase()) &&
              this.input_song.toLowerCase() != ''
            ) {
              this.score += 1;
              console.log('Seul le titre est correct : ' + this.score);
              this.updateScoreText(this.score, 'Seul le titre est correct !');
            }

            // Vérification si seulement l'artiste est correct
            else if (
              artistNames.includes(this.input_artist.toLowerCase()) &&
              this.input_artist.toLowerCase() != ''
            ) {
              this.score += 1;
              console.log("Seul l'artiste est correct : " + this.score);
              this.updateScoreText(this.score, "Seul l'artiste est correct !");
            } else {
              this.updateScoreText(
                this.score,
                "L'artiste et le titre sont faux !"
              );
            }

            //affichage de la réponse

            this.artiste_song_correcte(artistNames, trackName);
          }
        }

        // Incrémentation de l'indice après le traitement à l'indice currentindex
        this.indice();
      });
  }
  //mettre à jour le texte d'affichage du jeu : réponse correcte ou non et le score courant
  public updateScoreText(score: number, message: string) {
    const resultTextElement = document.getElementById('resultText');
    if (resultTextElement) {
      // Si l'élément existe, mettre à jour son texte avec le score
      resultTextElement.innerText = message + '\nScore = ' + score;
    }
  }

  //affiche la réponse (artiste et titre)
  public artiste_song_correcte(artiste: string, song: string) {
    if (this.currentTrackIndex !== 0) {
      // Vérification que l'indice n'est pas égal à 0
      const resultTextElement = document.getElementById('reponsecorrecte');
      if (resultTextElement) {
        // Si l'élément existe, mettre à jour son texte avec le score
        resultTextElement.innerText =
          "L'artiste est " + artiste + ' et le titre est ' + song;
      }
    }
  }

  // affichage de la fin de partie
  public gameEnd() {
    const resultTextElement = document.getElementById('gameEnd');
    if (resultTextElement) {
      resultTextElement.innerText =
        'La partie est terminée.\n \n Bravo ! \n\n Voici votre score : ' +
        this.score +
        '\n\n Vous pouvez jouer à une nouvelle partie en cliquant sur jouer';
    }
  }
}
