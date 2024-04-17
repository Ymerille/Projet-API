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
import { HomeGameComponent } from './home-game/home-game.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { SpotifyCallbackComponent } from './spotify-callback/spotify-callback.component';
import {MatCardModule} from '@angular/material/card';
import { GamePlayComponent } from './game-play/game-play.component';
import { ProfileComponent } from './profile/profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageConnecterComponent } from './home-page-connecter/home-page-connecter.component';
import { PlaylistutilisateurComponent } from './playlistutilisateur/playlistutilisateur.component';
import { ScorePageComponent } from './score-page/score-page.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginUserComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    TestConnexionComponent,
    TestFirebaseComponent,
    HomeGameComponent,
    HeaderComponent,
    SpotifyLoginComponent,
    SpotifyCallbackComponent,
    GamePlayComponent,
    ProfileComponent,
    HomePageComponent,
    HomePageConnecterComponent,
    PlaylistutilisateurComponent,
    ScorePageComponent,
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
    FormsModule, MatFormFieldModule, MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSidenav,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
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
