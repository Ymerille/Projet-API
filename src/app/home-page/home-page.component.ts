import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
  constructor(private router: Router) {}

  onLogin(): void 
    {
    this.router.navigateByUrl('login')
    }
  onProfile(): void 
    {
    this.router.navigateByUrl('profile')
    }
  onJOUER(): void 
    {
    this.router.navigateByUrl('home-game')
    }
}
