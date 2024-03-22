import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user';
import { LoginUserComponent } from './login-user/login-user.component';
import { TestConnexionComponent } from './test-connexion/test-connexion.component';
import { TestFirebaseComponent } from './test-firebase/test-firebase.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'test', component: TestConnexionComponent, canActivate: [AuthGuard]},
  { path: 'city', component: TestFirebaseComponent, canActivate: [AuthGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}
