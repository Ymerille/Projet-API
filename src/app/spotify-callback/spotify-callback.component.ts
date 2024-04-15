import { Component, Inject, inject } from '@angular/core';
import { SpotifyAuthService } from '../spotify-auth.service';
import { Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../services/user';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-spotify-callback',
  templateUrl: './spotify-callback.component.html',
  styleUrl: './spotify-callback.component.css'
})
export class SpotifyCallbackComponent {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  public userData?: User;

  public lastName: string = '';
  public firstName: string = '';
  public email: string = '';

  private accessToken: string = '';
  profile: any;

  constructor(
    private router: Router,
    public spotifyService: SpotifyService,
    public spotifyAuthService: SpotifyAuthService,
  ) {
  }  
  

  ngOnInit() {
    this.writeToken();
    this.router.navigateByUrl('/home-game');
    //this.fetchProfile(this.accessToken);
    //this.spotifyService.getProfile(this.accessToken);
  }

  async writeToken() {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      this.accessToken = await this.spotifyAuthService.getAccessToken(code);
    }
  }

  // async fetchProfile(token: string): Promise<void> {
  //   this.profile = await this.spotifyAuthService.fetchProfile(token);
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


