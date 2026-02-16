import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly tokenName = 'Cnv';
  private readonly userToken = `token${this.tokenName}`;
  private readonly userTokenExpiration = `tokenExp${this.tokenName}`;

  saveToken(accessToken: string): void {
    localStorage.setItem(this.userToken, accessToken);
  }

  saveTokenExpiration(): void {
    const expiration = this.getJWTClaim('exp');

    if (expiration) localStorage.setItem(this.userTokenExpiration, expiration);
  }

  getToken(): string | null {
    return localStorage.getItem(this.userToken);
  }

  getTokenExpiration(): string | null {
    return localStorage.getItem(this.userTokenExpiration);
  }

  isTokenExpired(): boolean {
    const tokenExpiration = this.getTokenExpiration();

    if (!tokenExpiration) return true;

    return +tokenExpiration * 1000 < Date.now();
  }

  removeTokenKeys(): void {
    localStorage.removeItem(this.userToken);
    localStorage.removeItem(this.userTokenExpiration);
  }

  getJWTClaim(claim: string): string {
    const token = this.getToken();

    if (!token) return '';

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[claim];
  }
}
