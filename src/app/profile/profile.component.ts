import { Component, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../services/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  public userData?: User;

  public lastName: string = '';
  public firstName: string = '';
  public email: string = '';

  constructor(
    private router: Router,
    public authService: AuthService,
  ) {
    
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const docRef = doc(this.firestore, 'users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            this.userData = <User>docSnap.data();
            this.lastName = docSnap.data()['lastName'];
            this.firstName = docSnap.data()['firstName'];
            this.email = docSnap.data()['email'];
          }
        });
      }
    });
  }

  ngOnInit() {

  }

}

