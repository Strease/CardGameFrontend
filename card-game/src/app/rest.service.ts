import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class Game {
  id: string;
  playerA: Player;
  playerB: Player;
  board: Card[];

  constructor(){
    this.playerA = new Player();
    this.playerB = new Player();
  }
}

export class Player{
  name: string = "";
  id: string = "";
}

export class Card{
  id: number = 0;
  name: string = "";
  maxHp: number = 0;
  abilities: string[];
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

  recruitCard(gameId:string, playerId: string, cardId: number): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId, 
      "cardId": cardId
    }
    return this.http.post(endpoint + 'game/recruit/', requestBody).pipe(
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
