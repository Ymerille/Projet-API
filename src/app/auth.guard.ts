import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const AuthGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

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
export class AuthService {
  public isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLogged(): boolean {
    return this.isAuthenticated;
  }
}