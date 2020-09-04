import { Component, Input, OnInit } from '@angular/core';
import { RestService, Game, Card } from '../rest.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  @Input() id: string = null;
  @Input() playerId: string = null;
  game: Game = null;
  playerCollection: Card[] = null;

  constructor(public rest: RestService) { 
    // Set interval for GET on game
    interval(1500).subscribe(x => {
      if(this.id != null && this.playerId != null){
        this.rest.getGame(this.id, this.playerId).subscribe((resp: any) => {
          this.game = resp;
        });
      }
      if(this.playerCollection == null && this.playerId != null){
        this.getUserCollection();
      }
    });
  }

  ngOnInit(): void { }

  getUserCollection(){
    this.rest.getUserCollection(this.playerId).subscribe((resp: any) => {
      this.playerCollection = resp.cardCollection;
    });
  }

  recruitCard(cardId:string){
    this.rest.recruitCard(this.id, this.playerId, cardId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  pickTurn(boardCardId:string, abilityId:string){
    this.rest.pickTurn(this.id, this.playerId, boardCardId, abilityId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  targetTurn(targetId:string){
    this.rest.targetTurn(this.id, this.playerId, targetId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

}
