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

  getGame(gameId: string, playerId: string): Observable<any> {
    return this.http.get<Game>(endpoint + 'game/' + gameId + '/' + playerId).pipe(
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

  passTurn(gameId:string, playerId: string): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId,
      "championdId": null,
      "abilityId": null
    }
    return this.http.post(endpoint + 'game/pickturn/', requestBody).pipe(
      catchError(this.handleError)
    );
  }


  pickTurn(gameId:string, playerId: string, championdId: string, abilityId:string): Observable<any> {
    let requestBody = {
      "gameId": gameId, 
      "playerId": playerId,
      "championId": championdId,
      "abilityId": abilityId
    }
    return this.http.post(endpoint + 'game/pickturn/', requestBody).pipe(
      catchError(this.handleError)
    );
  }

  levelUpAbility(gameId:string, playerId:string, championId: string, pickId: string, removeId:string): Observable<any> {
    let requestBody = {
      "gameId": gameId,
      "playerId": playerId,
      "championId": championId,
      "pick": pickId,
      "remove": removeId,
      "type": "ability"
    }
    console.log(requestBody);
    return this.http.post(endpoint + 'game/levelup/', requestBody).pipe(
      catchError(this.handleError)
    );
  }

  levelUpWeapon(gameId:string, playerId:string, championId: string, pickId: string): Observable<any> {
    let requestBody = {
      "gameId": gameId,
      "playerId": playerId,
      "championId": championId,
      "pick": pickId,
      "type": "weapon"
    }
    console.log(requestBody);
    return this.http.post(endpoint + 'game/levelup/', requestBody).pipe(
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
