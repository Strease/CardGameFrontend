import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BoardAbility, BoardChampion, RestService } from '../rest.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']
})
export class ChampionComponent implements OnInit {
  @Input() boardChampion: BoardChampion;
  @Input() position: number;
  @Input() pickedAbility: string;
  @Input() target: boolean;
  @Input() mine: boolean;
  @Output() cardClicked = new EventEmitter<BoardAbility>();

  @Input() playerId: string;
  @Input() gameId: string;

  Math = Math;

  tooltip: object = null;
  picksShown: boolean;

  levelPick: string = '';


  callCardClick(boardAbility:BoardAbility): void {
    this.cardClicked.next(boardAbility);
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

  arrayOne(n: number): any[] {
    return Array(n);
  }

}
