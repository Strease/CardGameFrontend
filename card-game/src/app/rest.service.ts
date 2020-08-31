import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class Game {
  id: string;
  playerA: Player;
  playerB: Player;

  constructor(){
    this.playerA = new Player();
    this.playerB = new Player();
  }
}

export class Player{
  name: string = "";
}

const endpoint = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getGame(id: string): Observable<any> {
    return this.http.get<Game>(endpoint + 'game/' + id).pipe(
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
