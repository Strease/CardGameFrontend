import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BoardChampion, RestService } from '../rest.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']
})
export class ChampionComponent implements OnInit {
  @Input() boardChampion: BoardChampion;
  @Input() pickedAbility: string;
  @Input() target: boolean;
  @Output() cardClicked = new EventEmitter<string>();

  @Input() playerId: string;
  @Input() gameId: string;

  Math = Math;

  tooltip: object = null;
  picksShown: boolean;

  levelPick: string = '';


  callCardClick(ability:string): void {
    this.cardClicked.next(ability);
  }

  constructor(public rest: RestService) { }

  ngOnInit(): void {
  }

  showTooltip(ability: object){
    this.tooltip = ability;
  }

  hideTooltip(){
    this.tooltip = null;
  }

  togglePicksWindow(){
    if(this.picksShown == true){
      this.picksShown = false;
    }else if(this.boardChampion.dinged){
      this.picksShown = true;
    }
    this.levelPick = '';
  }

  levelUpAbility(abilityId:string){
    this.rest.levelUpAbility(this.gameId, this.playerId, this.boardChampion.boardChampionId, abilityId, null).subscribe((resp: any) => {
    });
  }

  levelUpWeapon(weaponId:string){
    this.rest.levelUpWeapon(this.gameId, this.playerId, this.boardChampion.boardChampionId, weaponId).subscribe((resp: any) => {
    });
  }

  levelUpAbilityFull(abilityId:string){
    this.levelPick = abilityId;
  }

  levelUpAbilityRemove(abilityId:string){
    this.rest.levelUpAbility(this.gameId, this.playerId, this.boardChampion.boardChampionId, this.levelPick, abilityId).subscribe((resp: any) => {
    });
  }

  undoPick(){
    this.levelPick = '';
  }

}
