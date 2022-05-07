import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stay-touch';
  date: Date = new Date();
  appSize: string[] = [];
  rowSize: number = 3; // choose row size as you want
  colSize: number = 3;// choose col size as you want
  Grid: any = [];
  player: string = 'X';
  gameOver: boolean = false;
  winner: string = '--o--';
  color = '#eeeeee';
  selectedColor: boolean = false;


  constructor() {
  }

  ngOnInit() {
    this.newGame();
    console.log(this.Grid, "grid")
  }

  selectColor(event: any) {
    this.color = event?.target?.value;
    this.selectedColor = true;
    console.log(this.color, 'choosen color...')

  }

  newGame() {
    this.gameOver = false;
    this.Grid = [];
    let count = 0;
    for (let i = 0; i < this.colSize; i++) {
      this.Grid[i] = [];
      for (let j = 0; j < this.rowSize; j++) {
        this.Grid[i][j] = '';
        count++;
      }
    }
  }

  onClickGrid(col: string, colid: number, rowid: number) {
    if (col === '') {
      this.Grid[rowid][colid] = this.player;
      this.player = this.player === "X" ? "O" : "X";
      this.winner = this.getWinner();
      if (this.winner) {
        this.newGame();
        setTimeout(() => {
          this.winner = '--o--';
        }, 5000)
      }
      console.log(this.winner, "winner...");
    }
  }

  getWinner() {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const z = this.Grid.flat();
      if (z[a] && z[a] == z[b] && z[a] == z[c]) {
        this.gameOver = true;
        return z[a];
      }
    };
    return null;
  }
}
