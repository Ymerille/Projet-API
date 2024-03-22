import { Component, OnInit, inject } from '@angular/core'
import { Auth, PasswordPolicy } from '@angular/fire/auth';
import { Router } from '@angular/router'

import { createUserWithEmailAndPassword } from '@angular/fire/auth'


@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
})

export class CreateUserComponent implements OnInit {
    public userEmail!: string;
    public userPassword! : string;
    //const auth = getAuth();
    private auth: Auth = inject(Auth);
    
    constructor(private router: Router) {}

    ngOnInit(): void {
        
    }
    onContinue(): void {
        this.router.navigateByUrl('createUser')
    }
    onSubmitForm(): void {
        console.log(this.userEmail);
        createUserWithEmailAndPassword(this.auth, this.userEmail, this.userPassword)
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