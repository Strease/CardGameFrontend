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
  abilityName: string = '';
  tooltip: string = '';
  specialAbility: string = '';

  callCardClick(ability:string): void {
    this.cardClicked.next(ability);
  }

  constructor() { }

  ngOnInit(): void {
  }

  showTooltip(abilityName: string, baseAbility: string, specialAbility: string){
    this.abilityName = abilityName; 
    this.tooltip = baseAbility;
    this.specialAbility = specialAbility;
  }

  hideTooltip(){
    this.tooltip = '';
  }

}
