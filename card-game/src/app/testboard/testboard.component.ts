import { Component, OnInit } from '@angular/core';
import { RestService, Game } from '../rest.service';

@Component({
  selector: 'app-testboard',
  templateUrl: './testboard.component.html',
  styleUrls: ['./testboard.component.scss']
})

export class TestboardComponent implements OnInit {

  game: Game = new Game();

  constructor(
    public rest: RestService) { }

  ngOnInit(): void {
    if(localStorage.getItem('gameId') != null){
      this.getGame();
    }
  }

  createGame(): void {
    this.rest.createTestGame().subscribe((resp: any) => {
      this.game = resp;
      localStorage.setItem('gameId', this.game.gameId);
    });
  }

  getGame(): void {
    this.rest.getGame(localStorage.getItem('gameId')).subscribe((resp: any) => {
      this.game = resp;
    });
  }
}
