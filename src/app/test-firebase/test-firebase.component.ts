import { Component, OnInit, inject } from '@angular/core';
import { Firestore, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, doc, getDoc } from "firebase/firestore";
@Component({
  selector: 'app-test-firebase',
  templateUrl: './test-firebase.component.html',
  styleUrls: ['./test-firebase.component.css']
})
export class TestFirebaseComponent implements OnInit{
  private firestore: Firestore = inject(Firestore);
  public name: string = '';
  public country: string = '';

  constructor(private router: Router) { }
  ngOnInit(){
    this.testdata();
  }
  public async testdata(){


  const citiesRef = collection(this.firestore, "cities");
  
  const docRef = doc(this.firestore, "cities", "SF");
  const docSnap = await getDoc(docRef);
  
  if(docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    this.name = docSnap.data()['name'];
    this.country = docSnap.data()['country'];

  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

}