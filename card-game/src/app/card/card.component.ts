import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card, BoardCard } from '../rest.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() boardCard: BoardCard;
  @Output() pickAbility = new EventEmitter<string>();
  @Output() targetCard = new EventEmitter();

  callPickAbility(ability:string): void {
    this.pickAbility.next(ability);
  }

  callTargetCard(): void{
    this.targetCard.next();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
