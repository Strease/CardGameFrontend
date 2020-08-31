import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RestService, Game, Card, Player } from '../rest.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  @Input() id: string = null;
  @Input() player: Player = new Player();
  opponent: Player = new Player();
  game: Game = new Game;

  constructor(public rest: RestService) { }

  ngOnInit(): void {}

  ngOnChanges() {
    if(this.id != null && this.player.id != null){
      this.getGame();
    }
   
  }

  getGame(): void {
    this.rest.getGame(this.id).subscribe((resp: any) => {
      this.game = resp;
      if(this.opponent.id != null && this.player.id == this.game.playerA.id){
        this.opponent = this.game.playerB;
      }else if(this.opponent.id != null && this.player.id == this.game.playerB.id){
        this.opponent = this.game.playerA
      }
    });
  }

  logGame(){
    console.log(this.game);
  }

  recruitCard(cardId:number){
    this.rest.recruitCard(this.id, this.player.id, cardId).subscribe((resp: any) => {
      this.game = resp;
    });
  }

}
