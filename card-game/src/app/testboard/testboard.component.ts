import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from "@angular/router";

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
    private route: ActivatedRoute,
    public rest: RestService) { }

  ngOnInit(): void {
    if(localStorage.getItem('gameId') != null){
      this.gameId = localStorage.getItem('gameId');
      this.playerA = this.route.snapshot.paramMap.get("playerId")
    }
  }

  createGame(): void {
    this.rest.createTestGame().subscribe((resp: any) => {
      localStorage.setItem('gameId', resp);
      this.gameId = resp;
    });
  }
}
