import { Component, inject } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'

import { signInWithEmailAndPassword } from '@angular/fire/auth'

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})

export class LoginUserComponent {
    public userEmail!: string;
    public userPassword! : string;

    private auth: Auth = inject(Auth);

    constructor(private router: Router) {}

    ngOnInit(): void {
        
    }
    onContinue(): void {
        this.router.navigateByUrl('login')
    }
    onSubmitForm(): void {
        console.log(this.userEmail);
        signInWithEmailAndPassword(this.auth, this.userEmail, this.userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("code erreur : ", errorCode, "message : ", errorMessage);
        });
        
    }
}
