import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFighter } from '../fighters/fighter.model';

@Injectable({
  providedIn: 'root',
})
export class FighterService {
  constructor(private http: HttpClient) {}

  getFighter(name: string): Observable<IFighter> {
    return this.http.get<IFighter>('/api/fighter', {
      params: { name },
    });
  }

}
