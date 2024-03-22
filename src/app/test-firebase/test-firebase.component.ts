import { Component, OnInit } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, doc, getDoc} from "firebase/firestore";
@Component({
  selector: 'app-test-firebase',
  templateUrl: './test-firebase.component.html',
  styleUrls: ['./test-firebase.component.css']
})

export class TestFirebaseComponent implements OnInit {
  public name: string = '';
  public country: string = '';

  constructor(private router: Router) {}

ngOnInit(): void {
  this.getDataFromFirebase();
}
async getDataFromFirebase(){
  const db = getFirestore();
  const  citiesRef = collection(db,"cities")

 /* await setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });*/


  const docRef = doc(db, "cities", "SF");
  //const docSnap = await getDoc(docRef);

  /*if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    this.name = docSnap.data()['name'];
    this.country = docSnap.data()['country'];
    
  } else {
    console.log("No such document!");
    // docSnap.data() will be undefined in this case
    
}*/
try{
const doc = await getDoc(docRef);
console.log("document data:", doc.data());
if (doc.exists()) {
this.name = doc.data()['name'];
this.country = doc.data()['country'];
}
}

catch(e){
  console.log("Error getting cached document:", e);

}
}
}