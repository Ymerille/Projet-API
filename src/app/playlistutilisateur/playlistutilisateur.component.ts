import { OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Component, Inject, Injectable, inject } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { SpotifyAuthService } from '../spotify-auth.service';
import { Observable } from 'rxjs';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../services/user';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { PlaylistService } from '../services/playlist.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-playlistutilisateur',
  templateUrl: './playlistutilisateur.component.html',
  styleUrl: './playlistutilisateur.component.css'
})

export class PlaylistutilisateurComponent {

  private auth: Auth = inject(Auth);
  public userData?: User;

  public email: string = '';

  constructor(
    public authService: AuthService,
    public firestore: Firestore,
    private router: Router,
    public spotifyService: SpotifyService,
    public spotifyAuthService: SpotifyAuthService,
    public playlistService: PlaylistService,
  ) 
  {
    onAuthStateChanged(this.auth, (user) => 
      {
      if (user) 
        {
        const docRef = doc(this.firestore, 'users', user.uid);
        getDoc(docRef).then(
          (docSnap) => 
          {
            if (docSnap.exists())
            {
              this.userData = <User>docSnap.data();
              this.email = docSnap.data()['email'];
              console.log(this.email);
            }
          }
          );
        }
      }
    );
  }

  public name : string = '';
  public bname : string[] = [];

  public docrefglobal = doc(this.firestore , 'Playlist' ,'test') ;

  ngOnInit()
  {
    this.testdata();
  }


  public async testdata(){

    const username = await this.email;
    const collectionRef = collection(this.firestore, 'Playlist' );
    const docRef = doc(this.firestore , 'Playlist' ,username);
    
    this.docrefglobal = docRef;

    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.bname = docSnap.data()['name'];

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async onCreate() { try 
    { 
      var champ: string[] = [];
      const docSnap = await getDoc(this.docrefglobal);

      if(docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        champ  = docSnap.data()['name'];
      }
      champ.push(this.name);

      setDoc(this.docrefglobal,{name : champ})
      console.log("Document written");
    }
    catch (error) { console.error(error); }
  }

  submitPlaylistURL(playlistURL: string) {
    this.playlistService.setPlaylistURL(playlistURL);
    this.router.navigateByUrl('/game');
  }

}