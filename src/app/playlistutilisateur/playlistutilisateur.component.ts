import { collection, setDoc } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../services/user';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { PlaylistService } from '../services/playlist.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-playlistutilisateur',
  templateUrl: './playlistutilisateur.component.html',
  styleUrl: './playlistutilisateur.component.css',
})
export class PlaylistutilisateurComponent {
  private auth: Auth = inject(Auth);
  public userData?: User;

  private accessToken =
    this.spotifyAuthService.getAccessTokenFromLocalStorage();

  public email: string = '';

  public name: string = '';

  public bname: string[][] = [];
  public bUrl: string[] = [];
  public bliste: any;

  public docRefglobal = doc(this.firestore, 'Playlist', 'test');

  public playlistobs: any;

  constructor(
    public authService: AuthService,
    public firestore: Firestore,
    private router: Router,
    public spotifyService: SpotifyService,
    public spotifyAuthService: SpotifyAuthService,
    public playlistService: PlaylistService
  ) {
    //On vient ici récuperer l'adresse mail de l'utilisateur pour l'utiliser comme clé dans la base de données
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const docRef = doc(this.firestore, 'users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            this.userData = <User>docSnap.data();
            this.email = docSnap.data()['email'];
            this.docRefglobal = doc(this.firestore, 'Playlist', this.email);
            console.log('docref', this.docRefglobal);
            this.testdata(); //on vient lancer le programme initial ici plutôt que dans le ngoninit
            //car sinon l'application cherche à executer le ng init en premier et sans les infos de l'utilisateur ça ne fonctionne pas
          }
        });
      }
    });
  }

  ngOnInit() {}

  public async testdata() {
    //affiche les playlists enregistrées de l'utilisteur

    const username = this.email;

    const collectionRef = collection(this.firestore, 'Playlist');
    const docRef = doc(this.firestore, 'Playlist', username);
    this.docRefglobal = docRef;
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Doc data:', docSnap.data());

      this.bname = docSnap.data()['name'];
      this.bUrl = docSnap.data()['Url'];

      this.bliste = this.bname.map((a, index) => [a, this.bUrl[index]]);
      console.log(this.bliste);
    } else {
      console.log("le doc n'existe pas");
    }
  }

  async onCreate() {
    try {
      //permet d'ajouter dans la firebase une nouvelle url de playlist au favoris
      var champ: string[] = [];
      var champ2: string[] = [];
      const docSnap = await getDoc(this.docRefglobal);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        champ = docSnap.data()['name'];
        champ2 = docSnap.data()['Url'];
      }
      var URLtoID: string = this.playlistService.getPlaylistID(this.name);
      console.log(URLtoID);
      this.spotifyService
        .getNamePlaylist(URLtoID, this.accessToken)
        .subscribe((data) => {
          this.playlistobs = data;
          console.log(this.playlistobs.name);
          var PlaylistName = this.playlistobs.name.toString();

          champ.push(PlaylistName);
          champ2.push(this.name);

          setDoc(this.docRefglobal, {
            name: champ,
            Url: champ2,
          });
          console.log('Document written');
        });
    } catch (error) {
      console.error(error);
    }
  }

  submitPlaylistURL(playlistURL: string) {
    //permet de lancer une session de jeu avec l'une des playlists enregistrée en appuyant sur un bouton
    this.playlistService.setPlaylistURL(playlistURL);
    this.router.navigateByUrl('/game');
  }
}
