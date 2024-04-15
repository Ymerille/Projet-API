import { Component, Inject, Injectable, inject } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { SpotifyAuthService } from '../spotify-auth.service';
import { Observable } from 'rxjs';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../services/user';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
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
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  public userData?: User;

  public lastName: string = '';
  public firstName: string = '';
  public email: string = '';

  constructor(
    private router: Router,
    public spotifyService: SpotifyService,
    public spotifyAuthService: SpotifyAuthService,
    public playlistService: PlaylistService,
    //@Inject(SpotifyService) private accessToken: SpotifyService["accessToken"],
    //@Inject(SpotifyAuthService) private clientID: SpotifyAuthService["clientID"],
    
  ) {
    
  }  
  

  ngOnInit() {
    //this.authenticate();
    //this.getProfile();
  }

  submitPlaylistURL(playlistURL: string) {
    this.playlistService.setPlaylistURL(playlistURL);
    this.router.navigateByUrl('/game');
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
  //       const profile = await this.getProfile();
  //       console.log(profile)
  //     } catch (error) {
  //       console.log("Erreur lors de l'authentification et la récupération du token");
  //     }
  //   }
  // }

  // public getProfile() {
  //   this.spotifyService.getProfile(this.accessToken)
  //   .subscribe(a => {
  //     console.log(a);
  //   })
  // }

  // public async getProfile() {
  //   const docRef = doc(this.firestore, "users", "ophpVdwF3qMJplfO121pHB6GnPp1");
  //   const docSnap = await getDoc(docRef);

  //   if(docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     this.lastName = docSnap.data()['lastName'];
  //     this.firstName = docSnap.data()['firstName'];
  //     this.email = docSnap.data()['email'];
  
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }

}
