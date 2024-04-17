import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css'
})
export class ScorePageComponent implements OnInit{
  public score: number = 0;

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.score = params['score'];
    });
  }

}