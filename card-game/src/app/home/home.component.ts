import { Component, OnInit } from '@angular/core';
import { RestService, Game } from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'card-game';

  game: Game = new Game();

  constructor(
    public rest: RestService) { }

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    this.rest.getGame("cec2a50d-9dca-4442-a358-96205aa5eada").subscribe((resp: any) => {
      this.game = resp;
      console.log(this.game);
    });
  }
}
