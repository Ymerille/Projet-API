import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private auth: Auth = inject(Auth);
  private isLogged: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // nous regardons si un utilisateur est connecté ou non afin de le rediriger soit vers le login, soit vers la page de jeu
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  onLogin(): void {
    this.router.navigateByUrl('login');
  }
  onJOUER(): void {
    this.router.navigateByUrl('home-game');
  }
}
