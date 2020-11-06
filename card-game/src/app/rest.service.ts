import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class Game {
  gameId: string;
  updateCounter: number;
  myBoard: BoardChampion[];
  opponentsBoard: BoardChampion[];
  turnstate: string;
  readyChampions: BoardChampion[];
}

export class Champion{
  championdId: string = '';
  name: string = '';
  baseHp: number = 0;
  abilities: string[];
  playerSide: string = '';
}

export class BoardChampion{
  boardChampionId: string = '';
  currentHp: number = 0;
  abilities: string[];
  champion: Champion = new Champion();
  statuses: Object[];
  isAlive: boolean;
  dinged: boolean;
}

export class BoardAbility{
  boardAbilityId: string = '';
  cooldownCounter: number;
  ability: Ability;
}

export class Ability{
  abilityId: number;
  targetType: string;
}

const endpoint = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getAllChampions(): Observable<any> {
    return this.http.get<Champion[]>(endpoint + 'champions/').pipe(
      catchError(this.handleError)
    );
  }

  getUserCollection(userId: string): Observable<any> {
    return this.http.get<Champion[]>(endpoint + 'user/collection/' + userId).pipe(
      catchError(this.handleError)
    );
  }

  getGame(gameId: string, playerId: string, updateCounter: number): Observable<any> {
    return this.http.get<Game>(endpoint + 'game/' + gameId + '/' + playerId + '/' + updateCounter).pipe(
      catchError(this.handleError)
    );
  }

  createTestGame(): Observable<any> {
    return this.http.post(endpoint + 'game/', {}).pipe(
      catchError(this.handleError)
    );
  }

  recruitChampion(gameId:string, playerId: string, championdId: string): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId, 
      "championId": championdId
    }
    return this.http.post(endpoint + 'game/recruit/', requestBody).pipe(
      catchError(this.handleError)
    );
  }

  endTurn(gameId:string, playerId: string): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId
    }
    return this.http.post(endpoint + 'game/endturn/', requestBody).pipe(
      catchError(this.handleError)
    );
  }


  pickTurn(gameId:string, playerId: string, championdId: string, targetId: string, abilityId:string): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId,
      "championId": championdId,
      "targetId": targetId,
      "abilityId": abilityId
    }
    return this.http.post(endpoint + 'game/pickturn/', requestBody).pipe(
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
