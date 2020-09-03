import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class Game {
  gameId: string;
  playerA: User;
  playerB: User;
  board: Card[];
  currentTurn: Turn;

  constructor(){
    this.playerA = new User();
    this.playerB = new User();
  }
}

export class User{
  userId: string = "";
  name: string = "";
}

export class Card{
  cardId: number = 0;
  name: string = "";
  maxHp: number = 0;
  abilities: string[];
  playerSide: string = "";
}

export class BoardCard{
  boardCardId: string = "";
  currentHp: number = 0;
  card: Card = new Card();
}

export class Turn{
  turnId :string;
  abilityResultPlayerA: string;
  abilityResultPlayerB: string;
  cardAbilityPlayerA: string;
  cardAbilityPlayerB: string;
  targetPlayerA: string;
  targetPlayerB: string;
}


const endpoint = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<any> {
    return this.http.get<Card>(endpoint + 'cards/').pipe(
      catchError(this.handleError)
    );
  }

  getGame(id: string): Observable<any> {
    return this.http.get<Game>(endpoint + 'game/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createTestGame(): Observable<any> {
    return this.http.post(endpoint + 'game/', {}).pipe(
      catchError(this.handleError)
    );
  }

  recruitCard(gameId:string, playerId: string, cardId: string): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId, 
      "cardId": cardId
    }
    return this.http.post(endpoint + 'game/recruit/', requestBody).pipe(
      catchError(this.handleError)
    );
  }

  pickTurn(gameId:string, playerId: string, cardId: string, abilityId:string): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId,
      "cardId": cardId,
      "abilityId": abilityId
    }
    return this.http.post(endpoint + 'game/pickturn/', requestBody).pipe(
      catchError(this.handleError)
    );
  }

  targetTurn(gameId:string, playerId: string, targetId: string): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId, 
      "targetId": targetId
    }
    return this.http.post(endpoint + 'game/targetturn/', requestBody).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
