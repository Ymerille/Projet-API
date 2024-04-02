import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebase } from '../environments/environment';
import { LoginUserComponent } from './login-user/login-user.component';
import { TestConnexionComponent } from './test-connexion/test-connexion.component';
import { TestFirebaseComponent } from './test-firebase/test-firebase.component';

import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginUserComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    TestConnexionComponent,
    TestFirebaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebase)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), //provideFirebaseApp(() => initializeApp({"projectId":"blindtest-71059","appId":"1:433409892438:web:070412168ef63aae30dbf7","storageBucket":"blindtest-71059.appspot.com","apiKey":"AIzaSyCNWYrPoy5Y-mMNIuNETnb6m1_IAd034tw","authDomain":"blindtest-71059.firebaseapp.com","messagingSenderId":"433409892438"})),
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
