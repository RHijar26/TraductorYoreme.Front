import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

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

  logout(): void {
    this.tokenService.removeTokenKeys();
  }
  
}
