import { Component, Input, OnInit } from '@angular/core';
import { RestService, Game, Champion, BoardChampion, BoardAbility } from '../rest.service';
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
  attackChampions: string[];
  pickedAbility: BoardAbility = null;
  pickedChampion: string = '';
  targetType: string = '';
  pickedTarget: string = '';

  constructor(public rest: RestService) { 
    // Set interval for GET on game
    if(this.playerCollection == null){
      this.getUserCollection();
    }
    interval(1500).subscribe(x => {
      if(this.game != null){
        var updateCounter = this.game.updateCounter
      }else{
        var updateCounter = 0;
      }
      if(this.id != null && this.playerId != null){
        this.rest.getGame(this.id, this.playerId, updateCounter ).subscribe((resp: any) => {
          if(this.game == null){
            this.game = resp;
          }else if(resp.updated == true && this.game.updateCounter != resp.updateCounter){
            this.game = resp;
          }
        });
      }
    });

  }

  ngOnInit(): void { }

  cardClicked(championdId: string, boardAbility: BoardAbility){
    if(this.game.turnstate === 'PICKING'){
      if(this.pickedAbility == null){
        this.pickedAbility = boardAbility;
        this.pickedChampion = championdId;
        this.targetType = boardAbility.ability.targetType;
        if(this.targetType == "AUTO"){
          this.pickTurn(this.pickedChampion, championdId, this.pickedAbility.boardAbilityId);
          this.pickedAbility = null;
          this.targetType = null;
          this.pickedChampion = '';
        }
      }else{
        this.pickTurn(this.pickedChampion, championdId, this.pickedAbility.boardAbilityId);
        this.pickedAbility = null;
        this.targetType = null;
        this.pickedChampion = '';
      }
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

  endTurn(){
    this.rest.endTurn(this.id, this.playerId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

  pickTurn(boardChampiondId:string, targetId:string, abilityId:string){
    this.rest.pickTurn(this.id, this.playerId, boardChampiondId, targetId, abilityId ).subscribe((resp: any) => {
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
