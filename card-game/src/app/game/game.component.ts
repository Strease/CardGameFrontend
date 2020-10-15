import { Component, Input, OnInit } from '@angular/core';
import { RestService, Game, Champion, BoardChampion } from '../rest.service';
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
  respÇache: any = null;
  playerCollection: Champion[] = null;

  constructor(public rest: RestService) { 
    // Set interval for GET on game
    interval(1500).subscribe(x => {
      if(this.id != null && this.playerId != null){
        this.rest.getGame(this.id, this.playerId).subscribe((resp: any) => {
          if(this.game == null){
            this.game = resp;
          }else if(this.game.updateCounter != resp.updateCounter){
            this.game = resp;
          }
        });
      }
      if(this.playerCollection == null && this.playerId != null){
        this.getUserCollection();
      }
    });
  }

  ngOnInit(): void { }

  cardClicked(championdId: string, ability: string){
    if(this.game.turnstate === 'PICKING'){
      this.pickTurn(championdId, ability);
    }
    if(this.game.turnstate === 'TARGETING'){
      this.targetTurn(championdId);
    }

  }

  getUserCollection(){
    this.rest.getAllChampions().subscribe((resp: any) => {
      this.playerCollection = resp;
    });
  }

  recruitChampion(championdId:string){
    this.rest.recruitChampion(this.id, this.playerId, championdId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  passTurn(){
    this.rest.passTurn(this.id, this.playerId).subscribe((resp: any) => {
      this.game = resp;
    });
  }


  pickTurn(boardChampiondId:string, abilityId:string){
    this.rest.pickTurn(this.id, this.playerId, boardChampiondId, abilityId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  targetTurn(targetId:string){
    this.rest.targetTurn(this.id, this.playerId, targetId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  getBoardChampionById(boardChampionId:string){
    for(let boardChampion of this.game.myBoard){
      if(boardChampion.boardChampionId === boardChampionId){
        return boardChampion;
      }
    }
    for(let boardChampion of this.game.opponentsBoard){
      if(boardChampion.boardChampionId === boardChampionId){
        return boardChampion;
      }
    }

  }

}
