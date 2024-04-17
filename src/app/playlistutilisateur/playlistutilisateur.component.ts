import { Component , OnInit , inject } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Router } from '@angular/router';
import { Firestore, collection, doc, addDoc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-playlistutilisateur',
  templateUrl: './playlistutilisateur.component.html',
  styleUrl: './playlistutilisateur.component.css'
})

export class PlaylistutilisateurComponent {

  constructor(public firestore: Firestore) {}

  public username = "lucie";

  public collectionRef = collection(this.firestore, 'Playlist' );
  public docRef = doc(this.firestore , 'Playlist' ,this.username);

  public name : string = '';
  public bname : string[] = [];

  ngOnInit(){this.testdata();}

  public async testdata(){
    
    const docSnap = await getDoc(this.docRef);
    
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
      const docSnap = await getDoc(this.docRef);

      if(docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        champ  = docSnap.data()['name'];
      }
      champ.push(this.name);

      setDoc(this.docRef,{name : champ})
      console.log("Document written");
    }
    catch (error) { console.error(error); }
  }

}