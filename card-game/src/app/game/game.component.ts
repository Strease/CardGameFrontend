import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { RestService, Game, User } from '../rest.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  @Input() id: string = null;
  @Input() player: User = new User();
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
      if(this.player.userId == this.game.playerA.userId){
        this.playerSide = 'A';
      }else if(this.player.userId == this.game.playerB.userId){
        this.playerSide = 'B';
      }
  }

  recruitCard(cardId:string){
    this.rest.recruitCard(this.id, this.player.userId, cardId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  pickTurn(boardCardId:string, abilityId:string){
    this.rest.pickTurn(this.id, this.player.userId, boardCardId, abilityId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  targetTurn(targetId:string){
    this.rest.targetTurn(this.id, this.player.userId, targetId).subscribe((resp: any) => {
      this.game = resp;
    });
  }
}
