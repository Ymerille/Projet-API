import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const AuthGuard = () => {
  const auth = inject(AuthServiceTest);
  const router = inject(Router);
  console.log(auth.isLogged());

  if(!auth.isLogged()) {
      router.navigateByUrl('/login')
      return false
  }
  return true
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceTest {

  public isAuthenticated = false;

  public login() {
    this.isAuthenticated = true;
  }

  public logout() {
    this.isAuthenticated = false;
  }

  public isLogged(): boolean {
    return this.isAuthenticated;
  }
}