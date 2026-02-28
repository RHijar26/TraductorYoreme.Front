import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ModalService } from './modal.service';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = environment.apiUrl + 'auth/';
  

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private modalService = inject(ModalService);

  isLoggedIn(): boolean {
    const token = this.tokenService.getToken();

    if (!token) return false;

    const isTokenExpired = this.tokenService.isTokenExpired();

    if (isTokenExpired) {
      this.logout();
      return false;
    }

    return true;
  }

  login(request: object): Observable<boolean> {
    return this.http.post<object>(`${this.apiUrl}login`, request).pipe(
      map((response) => this.handleAuthSuccess(response)),
      catchError((err) => {
        this.modalService.showErrorModal(err);

        return of(false);
      })
    );
  }

  private handleAuthSuccess(response: any): boolean {
    this.tokenService.saveToken(response.token);
    this.tokenService.saveTokenExpiration();    
    return true;
  }

  logout(): void {
    this.tokenService.removeTokenKeys();
  }
  
}
