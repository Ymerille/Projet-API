import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { PlaylistService } from '../services/playlist.service';
import { SpotifyAuthService } from '../spotify-auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, defer, of } from 'rxjs';
@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.css'
})
export class GamePlayComponent implements OnInit {
  //accessToken = 'BQAAPSLuKEZOiHRNLYXLksZr0LrbTyyTy2NnMfqm75loRwVKV7_BlmK-NOOqcn5zld7iWWf5rpfCFYIMGEi8-q-J8TM82coP7OyjPXCj3pJSMr8dqTZwMJ76hri7ezfgDgSRkAgMjhYN68WS1A_JvcJI9Lqq7AwR2pPtAjyyYZ4sNS9tZklb0boWgUhHRjSmipr5';
  private accessToken = this.spotifyAuthService.getAccessTokenFromLocalStorage();
  public input_song: string = '' ; 
  public input_artist : string = '';
  currentTrackIndex: number = 0;
  trackURL: string = '';
  score: number = 0;
  total_tracks: number = 0;

  constructor(private spotifyService: SpotifyService,
              private playlistService: PlaylistService,
              private spotifyAuthService: SpotifyAuthService,
              private router: Router,
              private dialog: MatDialog,
            ) {}

  ngOnInit(): void {
    this.loadAndPlayNextTrack();
  }
  

  public loadAndPlayNextTrack() {
    const audioPlayer = document.getElementById('audioPlayer');
    
    //const playlistID = '37i9dQZF1DWXLbJb1PtkXq?si=819adf1d0a7c4895';
    const playlistURL = this.playlistService.getPlaylistURL();
    console.log(playlistURL);
    
    const playlistID = this.playlistService.getPlaylistID(playlistURL);
    console.log(playlistID);

    this.spotifyService.getPlaylist(playlistID, this.accessToken)
      .subscribe(data => {
        
        console.log(data);
        if(this.total_tracks < 5 ){
        const trackURL = data.tracks.items[this.currentTrackIndex].track.preview_url; 
  
        if(audioPlayer){
        audioPlayer.setAttribute('src', trackURL);
        }
      //this.indice();
      this.VerifText();

      // if (this.total_tracks == 5) {
      //   this.router.navigate(['/score'], { queryParams: { score: this.score } });
      // }
      
      
  }
  else{
    this.gameEnd();
      

    // this.VerifText();
    // this.router.navigate(['/score'], { queryParams: { score: this.score } });

  }
  this.total_tracks++;
      });
  }

  public indice(){
    this.currentTrackIndex++;
  }


  public VerifText(){
   //const playlistID = '37i9dQZF1DWXLbJb1PtkXq?si=819adf1d0a7c4895'; //37i9dQZF1DWXLbJb1PtkXq?si=819adf1d0a7c4895       37i9dQZF1DX55yuR78Invt?si=61646922a3074373   5670eCuwb34LqVW0coDGJj?si=25629a97858c46d2&pt=697dc6784b6f75d5e6ea5b15e19a8e19
    const playlistURL = this.playlistService.getPlaylistURL();
    const playlistID = this.playlistService.getPlaylistID(playlistURL);
   this.spotifyService.getPlaylist(playlistID, this.accessToken)
       .subscribe(data => {
           console.log(data);
 
//cas de la chanson de l'indice 0 qui doit être traité à part
if (this.currentTrackIndex === 0) {
  const currentTrack = data.tracks.items[0].track;
  const trackName = currentTrack.name.toLowerCase();
  const artistNames = currentTrack.artists.map((artist: any) => artist.name.toLowerCase());

  // Vérification si à la fois le titre et l'artiste sont corrects
  if (trackName.includes(this.input_song.toLowerCase()) && artistNames.includes(this.input_artist.toLowerCase()) && this.input_song.toLowerCase() != '' && this.input_artist.toLowerCase() != '') {
      this.score += 2;
      console.log("Les deux sont corrects : " + this.score);
      this.updateScoreText(this.score,"Les deux sont corrects");
  } else {
      // Vérification si seulement le titre est correct
      if (trackName.includes(this.input_song.toLowerCase()) && this.input_song.toLowerCase() != '') {
          this.score += 1;
          console.log("Seul le titre est correct : " + this.score);
          this.updateScoreText(this.score,"Seul le titre est correct !");
      } 

      // Vérification si seulement l'artiste est correct
      else if (artistNames.includes(this.input_artist.toLowerCase()) && this.input_artist.toLowerCase() != '') {
          this.score += 1;
          console.log("Seul l'artiste est correct : " + this.score);
          this.updateScoreText(this.score,"Seul l'artiste est correct !");
      } 
        //affichage de la réponse
      else {
        this.updateScoreText(this.score,"L'artiste et le titre sont faux !");
      }
        
      this.artiste_song_correcte(artistNames,trackName);    

  }

} else {
  // Vérification pour les pistes suivantes (currentIndex > 0)
  const currentTrack = data.tracks.items[this.currentTrackIndex - 1].track;
  const trackName = currentTrack.name.toLowerCase();
  const artistNames = currentTrack.artists.map((artist: any) => artist.name.toLowerCase());

  // Vérification si à la fois le titre et l'artiste sont corrects
  if (trackName.includes(this.input_song.toLowerCase()) && artistNames.includes(this.input_artist.toLowerCase()) && this.input_song.toLowerCase() != '' && this.input_artist.toLowerCase() != '') {
      this.score += 2;
      console.log("Les deux sont corrects : " + this.score);
      this.updateScoreText(this.score,"Les deux sont corrects !");
  } else {
      // Vérification si seulement le titre est correct
      if (trackName.includes(this.input_song.toLowerCase()) && this.input_song.toLowerCase() != '') {
          this.score += 1;
          console.log("Seul le titre est correct : " + this.score);
          this.updateScoreText(this.score,"Seul le titre est correct !");
      } 

      // Vérification si seulement l'artiste est correct
      else if (artistNames.includes(this.input_artist.toLowerCase()) && this.input_artist.toLowerCase() != '') {
          this.score += 1;
          console.log("Seul l'artiste est correct : " + this.score);
          this.updateScoreText(this.score,"Seul l'artiste est correct !");
      } 

    
      else {
        this.updateScoreText(this.score,"L'artiste et le titre sont faux !");
      }

      //affichage de la réponse

      this.artiste_song_correcte(artistNames,trackName);
  }



}

// Incrémentation de l'indice après le traitement à l'indice currentindex
this.indice();

});




};
//mettre à jour le texte d'affichage du jeu : réponse correcte ou non et le score courant
public updateScoreText(score: number,message: string) {
  const resultTextElement = document.getElementById('resultText');
  if (resultTextElement) {
      // Si l'élément existe, mettre à jour son texte avec le score
      resultTextElement.innerText = message + "\nScore = " + score;
  }
}

//affiche la réponse
public artiste_song_correcte(artiste: string, song: string) {
  if (this.currentTrackIndex !== 0) { // Vérification que l'indice n'est pas égal à 0
    const resultTextElement = document.getElementById('reponsecorrecte');
    if (resultTextElement) {
      // Si l'élément existe, mettre à jour son texte avec le score
      resultTextElement.innerText = "L'artiste est " + artiste + " et le titre est " + song;
    }
  }
}

public gameEnd() {
  // if (this.currentTrackIndex !== 0) { // Vérification que l'indice n'est pas égal à 0
    const resultTextElement = document.getElementById('gameEnd');
    if (resultTextElement) {
      // Si l'élément existe, mettre à jour son texte avec le score
      resultTextElement.innerText = "La partie est terminée, voici votre score : " + this.score;
    }
  //}
}
}