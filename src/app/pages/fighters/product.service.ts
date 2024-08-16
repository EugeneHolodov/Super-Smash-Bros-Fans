import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFighter } from './fighter.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  
  getFighters(): Observable<IFighter[]> {
    return this.http.get<IFighter[]>('/api/fighters');
  }
}
