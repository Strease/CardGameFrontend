import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BoardCard } from '../rest.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() boardCard: BoardCard;
  @Input() pickedAbility: string;
  @Input() target: boolean;
  @Output() cardClicked = new EventEmitter<string>();
  tooltip: object = null;

  callCardClick(ability:string): void {
    this.cardClicked.next(ability);
  }

  constructor() { }

  ngOnInit(): void {
  }

  showTooltip(ability: object){
    this.tooltip = ability;
  }

  hideTooltip(){
    this.tooltip = null;
  }

}
