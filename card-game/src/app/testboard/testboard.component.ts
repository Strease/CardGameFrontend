import { Component, OnInit } from '@angular/core';
import { RestService, Game } from '../rest.service';

@Component({
  selector: 'app-testboard',
  templateUrl: './testboard.component.html',
  styleUrls: ['./testboard.component.scss']
})

export class TestboardComponent implements OnInit {

  gameId: string;
  playerA: string = '00000000-aaaa-1111-2222-bbbbbbbbbbbb';
  playerB: string = '00000001-aaaa-1111-2222-bbbbbbbbbbbb';

  constructor(
    public rest: RestService) { }

  ngOnInit(): void {
    if(localStorage.getItem('gameId') != null){
      this.gameId = localStorage.getItem('gameId');
    }
  }

  createGame(): void {
    this.rest.createTestGame().subscribe((resp: any) => {
      localStorage.setItem('gameId', resp);
      this.gameId = resp;
    });
  }
}
