import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyAuthService {
  constructor(private auth: AuthService) {}

  getAccessToken(): Observable<string | undefined> {
    // Логируем результат getAccessTokenSilently() перед возвратом
    return new Observable<string | undefined>((observer) => {
        this.auth.getAccessTokenSilently().subscribe({
            next: (token) => {
                console.log('Token received:', token);
                observer.next(token);
                observer.complete();
            },
            error: (err) => {
                console.error('Error getting token:', err);
                observer.error(err);
            }
        });
    });
}
}
