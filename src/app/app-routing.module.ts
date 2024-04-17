import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { TestConnexionComponent } from './test-connexion/test-connexion.component';
import { TestFirebaseComponent } from './test-firebase/test-firebase.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { HomeGameComponent } from './home-game/home-game.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { SpotifyCallbackComponent } from './spotify-callback/spotify-callback.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { ProfileComponent } from './profile/profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageConnecterComponent } from './home-page-connecter/home-page-connecter.component';
import { PlaylistutilisateurComponent } from './playlistutilisateur/playlistutilisateur.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'app', component: AppComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'home-game', component: HomeGameComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'spotify-login', component: SpotifyLoginComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'callback', component: SpotifyCallbackComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'game', component: GamePlayComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome } },
  { path: 'home', component: HomePageComponent },
  { path: 'playlist', component: PlaylistutilisateurComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome }},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}
