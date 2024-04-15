import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-connecter',
  templateUrl: './home-page-connecter.component.html',
  styleUrl: './home-page-connecter.component.css'
})
export class HomePageConnecterComponent {
  constructor(private router: Router) {}

  onJouer(): void 
    {
    this.router.navigateByUrl('game')
    }
  onProfile(): void 
    {
    this.router.navigateByUrl('profile')
    }
}