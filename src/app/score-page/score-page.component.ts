import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css',
  //imports: [MatButtonModule],
})
export class ScorePageComponent implements OnInit{
  public score: number = 0;

  constructor(public dialog: MatDialog/*private route: ActivatedRoute*/) { }
  ngOnInit(): void {
   // this.route.queryParams.subscribe(params => {
      //this.score = params['score'];
    }//);



    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(DialogAnimationsExampleDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }

    
  }

  export class DialogAnimationsExampleDialog {
    constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
  }