import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface ImprintItem {
  id: string;
  Title: string;
  Text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImprintService {
  private url = 'https://strapi.esn-freiburg.de/website-imprint';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchImprint(): Observable<ImprintItem> {
    return this.http.get<ImprintItem>(this.url).pipe(
      tap((_) => this.log('fetched imprint')),
      catchError(this.handleError<ImprintItem>('fetchImprintList'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`ContentService: ${message}`);
  }
}