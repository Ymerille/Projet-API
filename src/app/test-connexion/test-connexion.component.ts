import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-test-connexion',
  templateUrl: './test-connexion.component.html',
  styleUrl: './test-connexion.component.css'
})
export class TestConnexionComponent {
  private firestore: Firestore = inject(Firestore);
  
}
