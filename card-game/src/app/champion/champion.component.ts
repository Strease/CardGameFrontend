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

  tooltip: object = null;
  picksShown: boolean = false;

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

  togglePicks(){
    if(this.picksShown == true){
      this.picksShown = false;
    }else{
      this.picksShown = true;
    }
  }

  levelUp(pickId:string){
    this.rest.levelUp(this.gameId, this.playerId, this.boardChampion.boardChampionId, pickId, null).subscribe((resp: any) => {
    });
  }

}
