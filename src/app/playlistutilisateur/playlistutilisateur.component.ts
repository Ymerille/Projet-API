import { Component , OnInit , inject } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Router } from '@angular/router';
import { Firestore, collection, doc, addDoc, getDoc, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-playlistutilisateur',
  templateUrl: './playlistutilisateur.component.html',
  styleUrl: './playlistutilisateur.component.css'
})

export class PlaylistutilisateurComponent {

  constructor(public firestore: Firestore) {}

  public collectionRef = collection(this.firestore, 'test' );
  public docRef = doc(this.firestore , 'test' ,'test');

  public name = '';
  public bname = '';


  async onCreate() {
    try 
    {
      setDoc(this.docRef,{name : this.name})
      console.log("Document written");
    }
    catch (error) { console.error(error); }
  }

  /*
  ngOnInit(){this.testdata();}

  public async testdata(){
    
    const citiesRef = collection(this.firestore, "Playlists");
    
    const docRef = doc(this.firestore, "Playlists", this.id);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.bname = docSnap.data()['name'];

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  */
}