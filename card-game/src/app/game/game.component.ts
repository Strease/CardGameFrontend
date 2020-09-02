import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { RestService, Game, Player } from '../rest.service';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { Observable } from '@nativescript/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  @Input() id: string = null;
  @Input() player: Player = new Player();
  game: Game = null;
  playerSide: string = null;

  constructor(public rest: RestService) { 
    // Set interval for GET on game
    interval(1000).subscribe(x => {
      if(this.id != null){
        this.rest.getGame((this.id)).subscribe((resp: any) => {
          this.game = resp;
          // Set playerside
          if(this.playerSide == null && this.game != null){
            this.getPlayerSide()
          }
        });
      }
    });
  }

  ngOnInit(): void { }

  getPlayerSide(){
      if(this.player.id == this.game.playerA.id){
        this.playerSide = 'A';
      }else if(this.player.id == this.game.playerB.id){
        this.playerSide = 'B';
      }
  }

  recruitCard(cardId:number){
    this.rest.recruitCard(this.id, this.player.id, cardId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  pickTurn(boardCardId:string, ability:string){
    this.rest.pickTurn(this.id, this.player.id, boardCardId, ability).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  targetTurn(targetId:string){
    this.rest.targetTurn(this.id, this.player.id, targetId).subscribe((resp: any) => {
      this.game = resp;
    });
  }
}
