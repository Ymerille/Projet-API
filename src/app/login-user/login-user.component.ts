import { Component, inject } from '@angular/core';
import { Auth, UserCredential, browserLocalPersistence, getAuth, setPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';

import { signInWithEmailAndPassword, browserSessionPersistence } from '@angular/fire/auth'

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})



export class LoginUserComponent {
    constructor(
        public authService: AuthService
    ) {}

    ngOnInit() {}

    // public userEmail!: string;
    // public userPassword! : string;

    // private auth: Auth = inject(Auth);

    // public log: AuthService = inject(AuthService);
    
    // constructor(private router: Router) {}

    // ngOnInit(): void {
    // }
    // onContinue(): void {
        
    //     this.router.navigateByUrl('login')
    // }

    // // login(email: string, password: string): Promise<UserCredential> {
    // //     return setPersistence(this.auth, browserLocalPersistence).then(() =>
    // //       signInWithEmailAndPassword(this.auth, email, password)
    // //     );
    // // }

    // onSubmitForm(): void {
    //     console.log(this.userEmail);
    //     signInWithEmailAndPassword(this.auth, this.userEmail, this.userPassword)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         console.log(user);
    //         this.log.login();
    //         console.log(this.log.isLogged())
            
    //     })
        
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log("code erreur : ", errorCode, "message : ", errorMessage);
    //     });
        
    // }
}
